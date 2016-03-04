var expect = require('chai').expect;
//var IH = require('../www/js/index_helper.js');
var LOC = require('../www/js/location.js');

describe("Location", function() {
    it("baseline", function() {
        expect(true).to.be.true;
    })
    it('Should be an object', function() {
        var x = 1;
        var y = 3;
        var point = new LOC.point(x,y);
        expect(point).to.be.an('object');       
    })
    
})