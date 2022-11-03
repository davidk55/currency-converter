class Util {
  isNumber(str: string | number): boolean {
    return (
      !isNaN(str as number) &&
      typeof str === 'string' &&
      /^\d*\.?\d*$/g.test(str)
    );
  }

  getDigitsAfterDecimal(num: number) {
    if (!num.toString().includes('.')) return 0;

    return num.toString().split('.')[1].length;
  }

  extractStringInBrackets(str: string) {
    return str.match(/\((.*?)\)/)?.[1];
  }
}

export default new Util();
