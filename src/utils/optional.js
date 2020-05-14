
function isNull(value) {
  return (value === undefined || value === null);
}

function isFunction(value) {
  return typeof value === 'function';
}

class Optional {
  constructor(value) {
    this._value = value;
  }
  get() {
    if (isNull(this._value)) {
      throw new Error('optional is empty');
    }
    return this._value;
  }
  isPresent() {
    return !isNull(this._value);
  }
  ifPresent(consumer) {
    if (!isNull(this._value)) {
      if (!isFunction(consumer)) {
        throw new Error('consumer is not a function');
      }
      consumer(this._value);
    }
  }

  /**
   * @param predicate
   * @returns {Optional}
   */
  filter(predicate) {
    if (!isFunction(predicate)) {
      throw new Error('predicate is not a function');
    }
    if (!isNull(this._value) && predicate(this._value)) {
      return new Optional(this._value);
    }
    return new Optional();
  }
  map(mapper) {
    if (!isFunction(mapper)) {
      throw new Error('mapper is not a function');
    }

    if (isNull(this._value)) {
      return new Optional();
    }

    const mappedValue = mapper(this._value);

    return isNull(mappedValue) ? new Optional() : new Optional(mappedValue);
  }
  orElse(other) {
    return isNull(this._value) ? other : this._value;
  }
  orElseGet(supplier) {
    if (!isFunction(supplier)) {
      throw new Error('supplier is not a function');
    }
    if (isNull(this._value)) {
      return supplier();
    }
    return this._value;
  }
  ifPresentOrElse(action, emptyAction) {
    if (!isNull(this._value)) {
      if (!isFunction(action)) {
        throw new Error('action is not a function');
      }
      action(this._value);
    } else {
      if (!isFunction(emptyAction)) {
        throw new Error('emptyAction is not a function');
      }
      emptyAction();
    }
  }
  or(optionalSupplier) {
    if (isNull(this._value)) {
      if (!isFunction(optionalSupplier)) {
        throw new Error('optionalSupplier is not a function');
      }
      return optionalSupplier();
    }
    return this;
  }
  hashMap() {
    // Here just to complete the Java Optional API.
    return -1;
  }

  static empty() {
    return new Optional();
  }
  static of(value) {
    if (value === undefined || value === null) {
      throw new Error('value is not defined');
    }
    return new Optional(value);
  }
  static ofNullable(value) {
    return new Optional(value);
  }
}


export default Optional;

