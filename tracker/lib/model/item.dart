class Item {
  final String code;
  final String value;

  Item(this.code, this.value);

  static final List<Item> statusOptions = [
    Item('1', 'Unallocated'),
    Item('2', 'Allocated'),
    Item('3', 'In-Progress'),
    Item('4', 'Delivered'),
  ];
}

