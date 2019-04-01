/* eslint-disable no-unused-vars */
class Maybe {
  static of (value) {
    return new Just(value);
  }

  static empty() {
    return new Nothing();
  }

  static toMaybe (value) {
    return value === null || value === undefined ? new Nothing() : new Just(value);
  }

  constructor (value) {
    if (this.constructor === Maybe) {
      throw new Error('Maybe should not be used as constructor.');
    }
    if (!this.isNothing) {
      this.value = value;
    }
  }

  unsafeGet() {
    return this.isNothing
      ? new TypeError(`Can't extract the value of a Nothing.\n\n    Since Nothing holds no values, it's not possible to extract one from them.\n    You might consider switching from Maybe#get to Maybe#getOrElse, or some other method that is not partial.`)
      : this.value;
  }

  getOrElse(_default) {
    return this.isNothing ? _default : this.value;
  }

  fold(fnN, fnJ) {
    return this.isNothing ? fnN() : fnJ(this.value);
  }

  bimap(_, fnJ) {
    return this.isNothing ? new Nothing() : new Just(fnJ(this.value));
  }
}


class Just extends Maybe {
  get isJust() { return true; }
  get isNothing() { return false; }

  map (fn) {
    return new Just(fn(this.value));
  }

  ap (aFn) {
    return aFn.chain(fn => Just.of(fn(this.value)));
  }

  chain (fnA) {
    return fnA(this.value);
  }

  filter(fn) {
    return fn(this.value) ? this : new Nothing();
  }

  join() {
    return this.value;
  }
}


class Nothing extends Maybe  {
  get isJust() { return false; }
  get isNothing() { return true; }

  map (_) {
    return this;
  }

  ap (_) {
    return this;
  }

  chain (_) {
    return this;
  }

  filter(_) {
    return this;
  }

  join() {
    return null;
  }
}

export {
  Maybe,
  Just,
  Nothing
};