const { map, get } = require('lodash');
const BaseExporter = require('./base');

/**
 * @implements {BaseExporter}
 */
class CSVExporter extends BaseExporter {
  /**
   * @override
   */
  constructor(settings) {
    super(settings);
    if (!this._settings.separator) this._settings.separator = ',';
    if (!this._settings.fields) throw new Error('Fields must be defined!');
  }

  /**
   * @param {!Object} result
   */
  writeLine(result) {
    const line = map(this._settings.fields, (field => get(result, field)))
      .join(this._settings.separator);
    this._stream.write(`${line}\n`);
  }

  /**
   * @override
   */
  writeHeader() {
    const header = this._settings.fields.join(this._settings.separator);
    this._stream.write(`${header}\n`);
  }

  /**
   * @override
   */
  writeFooter() {}
}

module.exports = CSVExporter;
