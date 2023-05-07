import dotenv  from "dotenv"
import rp from "request-promise"
import bcrypt from "bcrypt";
import mongoose from "mongoose"
import { managerSchema } from "../models/Manager.js"
import { dispatcherSchema } from "../models/Dispatcher.js"
import { packerSchema } from "../models/Packer.js"
import { driverSchema } from "../models/Driver.js"

dotenv.config() // load env file

const Manager = mongoose.model("Manager", managerSchema)
const Dispatcher = mongoose.model("Dispatcher", dispatcherSchema)
const Packer = mongoose.model("Packer", packerSchema)
const Driver = mongoose.model("Driver", driverSchema)
const saltRounds = 10;

export const getPwd = async(req, res) => {
    
    const myPlaintextPassword = '123456';
    var created_hash = '';
    var message = {
        'hash':'',
        'created_hash':'',
        'compare':false,
    }

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        created_hash = hash;
        message['hash'] = hash;
        message['created_hash'] = created_hash;
        res.send(message);

        // bcrypt.compare(myPlaintextPassword, created_hash, function(err, result) {
        //     message['compare'] = true;
        //     res.send(message);
        // });
    });

    
}

export const loginUser = async(req, res) => {
    try {
        const role = req.body.role;
        const username = req.body.username;
        const inputPassword = req.body.password;
        var foundUser = null;
        var resContent = {
            'message': 'Invalid username or password',
            'user': null,
            'token': '',
            'role': role,
        };

        switch (role) {
            case 'manager':
                foundUser = await Manager.findOne({ username : username });    
                break;
            case 'dispatcher':
                foundUser = await Dispatcher.findOne({ username : username });    
                break;
            case 'packer':
                foundUser = await Packer.findOne({ username : username });    
                break;
            case 'driver':
                foundUser = await Driver.findOne({ username : username });    
                break;
            default:
                foundUser = await Manager.findOne({ username : username });    
                break;
        }

        //https://medium.com/swlh/basic-login-system-with-node-js-99acf02275b9
        if (foundUser) {
            const passwordMatch = await bcrypt.compare(inputPassword, foundUser.password);
            if(passwordMatch){
                resContent['message'] = 'login successfully';
                resContent['user'] = foundUser;
            }
            res.send(resContent);
        }

    } catch (err) {
        res.status(400).json({
            message: err.toString()
        })
    }
};

// Convert address to latitude and longitude
export const convertAddressToLocation = async(address) => {
    return new Promise(function(resolve, reject) {
        geocode({
            address: address.street,
            postal: address.postcode,
            countryCode: address.country,
            authentication
        }).then((response) => {
            resolve(response.candidates[0].location);
        });
    });
}

export const searchByMatchingAttributes = async(providers, jobId, fromAddress) => {
    var key, filteredProviders, expr, i, index = 0;

    var currentProviders = providers;
    var attributes = await getMatchingAttributesByProviderCodeAndJobId(jobId);
    var sortAttributes = attributes[0]["matchingAttributes"];

    var keys = sortAttributes.map(a => a.name);
    const values = sortAttributes.map(a => a.value);
    const operators = sortAttributes.map(a => a.operator)

    var location = await convertAddressToLocation(fromAddress);
    var currentCoord = { lat: location.y, lng: location.x }
    const coords = providers.map(a => a.location);

    var distFromCurrent = function(coord) {
        return { coord: coord, dist: getDistance(currentCoord, coord) };
    }
    var distances = coords.map(distFromCurrent);

    for (const operator of operators) {
        expr = operator.toLowerCase();
        key = keys[index];
        switch (expr) {
            case 'eq':
                if (keys[index].toLowerCase() == 'location') {
                    i = -1;
                    filteredProviders = currentProviders.filter(provider => {
                        i++;
                        return provider.hasOwnProperty(key) && distances[index].dist == parseInt(values[index])
                    })
                } else {
                    filteredProviders = currentProviders.filter(provider => {
                        return provider.hasOwnProperty(key) && parseInt(provider[key]) == parseInt(values[index])
                    })
                }
                break;
            case 'gt':
                if (keys[index].toLowerCase() == 'location') {
                    i = -1;
                    filteredProviders = currentProviders.filter(provider => {
                        i++;
                        return provider.hasOwnProperty(key) && distances[index].dist > parseInt(values[index])
                    })
                } else {
                    filteredProviders = currentProviders.filter(provider => {
                        return provider.hasOwnProperty(key) && parseInt(provider[key]) > parseInt(values[index])
                    })
                }
                break;
            case 'ge':
                if (keys[index].toLowerCase() == 'location') {
                    i = -1;
                    filteredProviders = currentProviders.filter(provider => {
                        i++;
                        return provider.hasOwnProperty(key) && distances[index].dist >= parseInt(values[index])
                    })
                } else {
                    filteredProviders = currentProviders.filter(provider => {
                        return provider.hasOwnProperty(key) && parseInt(provider[key]) >= parseInt(values[index])
                    })
                }
                break;
            case 'lt':
                if (keys[index].toLowerCase() == 'location') {
                    i = -1;
                    filteredProviders = currentProviders.filter(provider => {
                        i++;
                        return provider.hasOwnProperty(key) && distances[i].dist < parseInt(values[index])
                    })
                } else {
                    filteredProviders = currentProviders.filter(provider => {
                        return provider.hasOwnProperty(key) && parseInt(provider[key]) < parseInt(values[index])
                    })
                }
                break;
            case 'le':
                if (keys[index].toLowerCase() == 'location') {
                    i = -1;
                    filteredProviders = currentProviders.filter(provider => {
                        i++;
                        return provider.hasOwnProperty(key) && distances[index].dist <= parseInt(values[index])
                    })
                } else {
                    filteredProviders = currentProviders.filter(provider => {
                        return provider.hasOwnProperty(key) && parseInt(provider[key]) <= parseInt(values[index])
                    })
                }
                break;
        }
        index++;
        currentProviders = filteredProviders;
    }
    return filteredProviders;
}

export const getMatchingAttributesByProviderCodeAndJobId = (jobId) => {
    var url = `${providerBaseURL}/config/${jobId}`;

    var options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        uri: url,
        json: true // Automatically stringifies the body to JSON
    };

    return new Promise(function(resolve, reject) {
        rp(options)
            .then(function(attributes) {
                resolve(attributes);
            })
            .catch(function(err) {
                console.error(err);
                reject(err);
            });
    });
}

export const getProvidersByPostCodeAndJobId = async(country, jobId) => {
    var url = `${providerBaseURL}/search`;

    var payload = {
        "country": country,
        "jobId": jobId
    };

    var options = {
        method: 'POST',
        uri: url,
        body: payload,
        json: true // Automatically stringifies the body to JSON
    };

    return new Promise(function(resolve, reject) {
        rp(options)
            .then(function(providers) {
                resolve(providers);
            })
            .catch(function(err) {
                console.error(err);
                reject(err);
            });
    });
}

// Save the booking request into crowdDb
export const createBooking = async(booking) => {
    return new Promise(function(resolve, reject) {
        let newBooking = new Booking(booking)
        newBooking.save()
            .then(booking => {
                resolve(booking)
            })
            .catch(err => {
                reject(err);
            });
    });
}