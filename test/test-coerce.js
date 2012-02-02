var fs = require('fs');
var parser = require('../lib');
var assert = require('assert');

var file = __dirname + '/fixtures/case.xml';

var data = fs.readFileSync(file);

// With coercion
var result = parser.toJson(data, {reversible: true, coerce: true, object: true});
assert.strictEqual(result.itemRecord.value[0].longValue['$t'], 12345);
assert.strictEqual(result.itemRecord.value[1].stringValue.number, false);
assert.strictEqual(result.itemRecord.value[2].moneyValue.number, true);
assert.strictEqual(result.itemRecord.value[2].moneyValue['$t'], 104.95);

// Without coercion
result = parser.toJson(data, {reversible: true, object: true});
assert.strictEqual(result.itemRecord.value[0].longValue['$t'], '12345');
assert.strictEqual(result.itemRecord.value[1].stringValue.number, 'false');
assert.strictEqual(result.itemRecord.value[2].moneyValue.number, 'true');
assert.strictEqual(result.itemRecord.value[2].moneyValue['$t'], '104.95');