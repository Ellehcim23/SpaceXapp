const { app, PORT } = require('../index')
const request = require('supertest')
const axios = require('axios')

describe('PORT', function () {
    it('should return a number', function () {
        expect(typeof PORT).toBe('number');
    })
    it('PORT is 8000 on development', () => {
        expect(PORT).toBe(8000);
    })
})

// home test
describe('GET /', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /capsules', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/capsules')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/capsules')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })//expect capusles.serial toBe !undefined  
})
describe('GET /capsules/*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/capsules/*')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/capsules/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('Serial Value should return true as a boolean', ()=> {
        axios.get('http://localhost:8000/capsules/serial/C103')
        .then(function(response) {
            let serialValue = response.data.capsule.serial
            expect(Boolean(serialValue)).toBe(true);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
    it('Response should be ', ()=> {
        axios.get('http://localhost:8000/capsules/serial/C99')
        .then(function(response) {
            console.log('Response here=>', response.data);
            expect(response.data.message).toBe('Data is not found, please try again')
            // expect(Boolean(capsuleLength)).toBe(false);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
})
describe('GET /company', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/company')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/company')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /cores', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/cores')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/cores')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /cores/*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/cores/*')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/cores/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('Serial Value should return true as a boolean', ()=> {
        axios.get('http://localhost:8000/cores/serial/Merlin1A')
        .then(function(response) {
            let serialValue = response.data.core.serial
            expect(Boolean(serialValue)).toBe(true);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
    it('Response should be ', ()=> {
        axios.get('http://localhost:8000/cores/serial/C99')
        .then(function(response) {
            console.log('Response here=>', response.data);
            expect(response.data.message).toBe('Data is not found, please try again')
            // expect(Boolean(capsuleLength)).toBe(false);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
})

describe('GET /crew', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/crew')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/crew')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    
})
describe('GET /dragons', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/dragons')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/dragons')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /dragons/*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/dragons/*')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/dragons/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('Dragon Value should return true as a boolean', ()=> {
        axios.get('http://localhost:8000/dragons/type/capsule')
        .then(function(response) {
            let dragonValue = response.data.dragon.type
            expect(Boolean(dragonValue)).toBe(true);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
    it('Response should be ', ()=> {
        axios.get('http://localhost:8000/dragons/type/capsules')
        .then(function(response) {
            console.log('Response here=>', response.data);
            expect(response.data.message).toBe('Data is not found, please try again')
            // expect(Boolean(capsuleLength)).toBe(false);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
})
describe('GET /history', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/history')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/history')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /landpads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/landpads')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/landpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})

describe('GET /landpads/*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/landpads/*')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/landpads/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('Landpads Value should return true as a boolean', ()=> {
        axios.get('http://localhost:8000/landpads/type/RTLS')
        .then(function(response) {
            let landpadValue = response.data.landpads[0].type
            expect(Boolean(landpadValue)).toBe(true);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
    it('Response should be ', ()=> {
        axios.get('http://localhost:8000/landpads/type/capsules')
        .then(function(response) {
            console.log('Response here=>', response.data);
            expect(response.data.message).toBe('Data is not found, please try again')
            // expect(Boolean(capsuleLength)).toBe(false);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
})
describe('GET /launches', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/launches')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /launches/*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/launches/*')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/launches/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('Launches Value should return true as a boolean', ()=> {
        axios.get('http://localhost:8000/launches/name/FalconSat')
        .then(function(response) {
            let launchValue = response.data.launch.name
            expect(Boolean(launchValue)).toBe(true);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
    it('Response should be ', ()=> {
        axios.get('http://localhost:8000/launches/name/Falcon')
        .then(function(response) {
            console.log('Response here=>', response.data);
            expect(response.data.message).toBe('Data is not found, please try again')
            // expect(Boolean(capsuleLength)).toBe(false);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
})
describe('GET /launchpads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/launchpads')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/launchpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /launchpads/*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/launchpads/*')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/launchpads/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('Launches Value should return true as a boolean', ()=> {
        axios.get('http://localhost:8000/launchpads/name/STLS')
        .then(function(response) {
            let launchpadValue = response.data.launchpad.name
            expect(Boolean(launchpadValue)).toBe(true);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
    it('Response should be ', ()=> {
        axios.get('http://localhost:8000/launchpads/name/Falcon')
        .then(function(response) {
            console.log('Response here=>', response.data);
            expect(response.data.message).toBe('Data is not found, please try again')
            // expect(Boolean(capsuleLength)).toBe(false);
        })
        .catch(function(error) {
            console.log('error here', error);
        })
    })
})
describe('GET /payloads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/payloads')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/payloads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /payloads/*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/payloads/*')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/payloads/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /roadster', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/roadster')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/roadster')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /rockets', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/rockets')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/rockets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /rockets/*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/rockets/*')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/rockets/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /ships', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/ships')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/ships')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /ships*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/ships/*')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/ships/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
describe('GET /starlink', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/starlink')
            .expect(200, done);
    })
    it('should respond with json', () => {
        request(app)
            .get('/starlink')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
})
