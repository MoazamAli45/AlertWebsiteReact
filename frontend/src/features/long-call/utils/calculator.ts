class Calculator {
  _stockPrice
  _riskFreeRate
  _today
  _maturity
  _impliedVol
  _strikePrice
  static _STEPS = 200

  constructor(stockPrice: number, riskFreeRate: number, today: string, maturity: string,
    impliedVol: number, strike: number) {
    this._stockPrice = stockPrice
    this._riskFreeRate = riskFreeRate
    this._today = today
    this._maturity = maturity
    this._impliedVol = impliedVol
    this._strikePrice = strike
  }

  setStockPrice(price: number) {
    this._stockPrice = price
  }

  getStockPrice() {
    return this._stockPrice
  }

  setRiskFreeRate(rate: number) {
    this._riskFreeRate = rate
  }

  getRiskFreeRate() {
    return this._riskFreeRate
  }

  setToday(today: string) {
    this._today = today
  }

  getToday() {
    return this._today
  }

  setMaturity(last: string) {
    this._maturity = last
  }

  getMaturity() {
    return this._maturity
  }

  setImpliedVol(vol: number) {
    this._impliedVol = vol
  }

  getImpliedVol() {
    return this._impliedVol
  }

  setStrikePrice(strikePrice: number) {
    this._strikePrice = strikePrice
  }

  getStrikePrice() {
    return this._strikePrice
  }
}

export class CallPrice extends Calculator {

  _daysBetween

  constructor(stockPrice: number, riskFreeRate: number, today: string, maturity: string,
    impliedVol: number, strike: number) {
    super(stockPrice, riskFreeRate, today, maturity,
      impliedVol, strike)
    this._daysBetween = this.getDaysBetween()
  }

  getDaysBetween() {
    const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
    const start = new Date(this.getToday());
    const end = new Date(this.getMaturity());
    const diffInMs = end.getTime() - start.getTime();
    return diffInMs / oneDay;
  }

  timeToMaturity() {
    return this._daysBetween / 365
  }

  changeInTime() {
    return this.timeToMaturity() / Calculator._STEPS
  }

  changeInTimeDays() {
    return this.changeInTime() * 365
  }

  percentIncreaseInUpMove() {
    return Math.exp(this.getImpliedVol() * Math.sqrt(this.changeInTime()))
  }

  percentDecreaseInDownMove() {
    return 1 / this.percentIncreaseInUpMove()
  }

  probabilityOfUpMove() {
    return (Math.exp(this.changeInTime() * this.getRiskFreeRate()) - this.percentDecreaseInDownMove()) /
      (this.percentIncreaseInUpMove() - this.percentDecreaseInDownMove())
  }

  probabilityOfDownMove() {
    return 1 - this.probabilityOfUpMove()
  }

  pathOfStock() {
    const ROWS = Calculator._STEPS + 1
    const COLS = Calculator._STEPS + 1

    const path = new Array(ROWS)

    for (let i = 0; i < ROWS; i++) {
      path[i] = new Array(COLS)
    }

    path[0][0] = this.getStockPrice()

    for (let x = 1; x < Calculator._STEPS + 1; x++) {
      path[x][0] = path[x - 1][0] * this.percentIncreaseInUpMove()
    }

    for (let x = 1; x <= Calculator._STEPS; x++) {
      for (let y = 1; y <= Calculator._STEPS; y++) {
        path[x][y] = path[x - 1][y - 1] * this.percentDecreaseInDownMove()
      }
    }
    return path
  }

  callValue() {
    const ROWS = Calculator._STEPS + 1
    const COLS = Calculator._STEPS + 1

    const calc = new Array(ROWS)

    for (let i = 0; i < ROWS; i++) {
      calc[i] = new Array(COLS)
    }

    const path = this.pathOfStock()

    for (let i = 0; i < calc.length; i++) {
      calc[Calculator._STEPS][i] = Math.max(path[Calculator._STEPS][i] - this.getStrikePrice(), 0)
    }

    for (let i = Calculator._STEPS - 1; i >= 0; i--) {
      for (let y = 0; y < Calculator._STEPS; y++) {
        calc[i][y] = Math.max(path[i][y] - this.getStrikePrice(), (calc[i + 1][y] * this.probabilityOfUpMove() + calc[i + 1][y + 1] *
          this.probabilityOfDownMove()) / Math.exp(this.getRiskFreeRate() * this.changeInTime()))
      }
    }

    const theor = calc[0][0]
    return theor
  }

}

export class PutPrice extends Calculator {

  _daysBetween

  constructor(stockPrice: number, riskFreeRate: number, today: string, maturity: string,
    impliedVol: number, strike: number) {
    super(stockPrice, riskFreeRate, today, maturity,
      impliedVol, strike)
    this._daysBetween = this.getDaysBetween()
  }

  getDaysBetween() {
    const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
    const start = new Date(this.getToday());
    const end = new Date(this.getMaturity());
    const diffInMs = end.getTime() - start.getTime();
    return Math.round(diffInMs / oneDay);
  }

  timeToMaturity() {
    return this._daysBetween / 365
  }

  changeInTime() {
    return this.timeToMaturity() / Calculator._STEPS
  }

  changeInTimeDays() {
    return this.changeInTime() * 365
  }

  percentIncreaseInUpMove() {
    return Math.exp(this.getImpliedVol() * Math.sqrt(this.changeInTime()))
  }

  percentDecreaseInDownMove() {
    return 1 / this.percentIncreaseInUpMove()
  }

  probabilityOfUpMove() {
    return (Math.exp(this.changeInTime() * this.getRiskFreeRate()) - this.percentDecreaseInDownMove()) /
      (this.percentIncreaseInUpMove() - this.percentDecreaseInDownMove())
  }

  probabilityOfDownMove() {
    return 1 - this.probabilityOfUpMove()
  }

  pathOfStock() {
    const ROWS = Calculator._STEPS + 1
    const COLS = Calculator._STEPS + 1

    const path = new Array(ROWS)

    for (let i = 0; i < ROWS; i++) {
      path[i] = new Array(COLS)
    }

    path[0][0] = this.getStockPrice()

    for (let x = 1; x < Calculator._STEPS + 1; x++) {
      path[x][0] = path[x - 1][0] * this.percentIncreaseInUpMove()
    }

    for (let x = 1; x <= Calculator._STEPS; x++) {
      for (let y = 1; y <= Calculator._STEPS; y++) {
        path[x][y] = path[x - 1][y - 1] * this.percentDecreaseInDownMove()
      }
    }
    return path
  }

  putValue() {
    const ROWS = Calculator._STEPS + 1
    const COLS = Calculator._STEPS + 1

    const calc = new Array(ROWS)

    for (let i = 0; i < ROWS; i++) {
      calc[i] = new Array(COLS)
    }

    const path = this.pathOfStock()

    for (let i = 0; i < calc.length; i++) {
      calc[Calculator._STEPS][i] = Math.max(this.getStrikePrice() - path[Calculator._STEPS][i], 0)
    }

    for (let i = Calculator._STEPS - 1; i >= 0; i--) {
      for (let y = 0; y < Calculator._STEPS; y++) {
        calc[i][y] = Math.max(this.getStrikePrice() - path[i][y], (calc[i + 1][y] * this.probabilityOfUpMove() + calc[i + 1][y + 1] *
          this.probabilityOfDownMove()) / Math.exp(this.getRiskFreeRate() * this.changeInTime()))
      }
    }

    const theor = calc[0][0]
    return theor
  }

}

// const brian = new CallPrice(437.96, .05198, '2023-04-28', '2023-05-19', .176, 410)
// console.log(brian.callValue())
