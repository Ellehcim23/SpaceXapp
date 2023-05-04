const express = require('express');
const axios = require('axios');
const { query } = require('express');
const app = express();
// const ejs = require('ejs');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
        .then(function (response) {
            // handle success
              console.log('data for /company: ', response.data);
            // to find company => console.log(response.data.name)
            res.render('index', { company: response.data }) // company.name
        })
        .catch(function (error) {
            // console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname+'/views/about.html');
})

app.get('/blog', function (req, res) {
    res.sendFile(__dirname+'/views/blog-directory.html');
})

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/views/index.ejs');
})

app.get('/capsules', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            console.log(response.data);
            // const capsulesData = response.data
            // capsulesData.forEach(capsule => {
            //     // console.log(capsule);
            // })
            res.render('capsules', { capsules: response.data })
        })
        .catch(function (error) {
            res.render('capsules', { message: 'Data not found. Please try again later.' });
        });
});

// Scenario 1 - return a single capsule
// app.get('/capsules/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/capsules')
//     .then(function (response) {
//         // console.log(response.data);

//         for(let i = 0; i < response.data.length; i++) {
//             let capsule = response.data[i];
//             let splitSerial = req.params.serial.split(''); // array ['c', '1', ..]
//             let finalSerial = splitSerial[0].toUpperCase() + splitSerial.splice(1).join('');
//             // let upperCaseSerial = req.params.serial.toUpperCase();
//             // upperCaseSerial[0].toUpperCase();
//             // upperCaseSerial.join();
//             // console.log('capsule', capsule); // { serial: 'C101', ...}
//             if (capsule.serial === finalSerial){
//                 res.json({ capsule: capsule});
//             }
//         }
//         res.json({ data: 'Capsule does not exist' })
//     })
//     .catch(function (error) {
//         res.json({ message: 'Data not found. Please try again later.' });
//     }); 
// });

app.get("/search", (req, res) => {
    let result = {};
    // { name: 'capsules', serial: 'C103' }
    // How would we make an axios when the item is different?
    axios.get(`https://api.spacexdata.com/v4/${req.query.item}`)
    .then(function(response) {
      let responseArray = []; 
        for (let key in req.query) {
            if (key === 'item') {
                // do nothing
                continue;
            } else {
                // run for loop to search for key and value
                // key -> serial
                // req.query[key] -> C103
                for (let i = 0; i < response.data.length; i++) {
                    let responseValue = response.data[i];
                    if (responseValue.serial === req.query[key]) { // if the response responseValue.serial is equal the search item C103
                        return res.json({ responseValue });
                    } else if (responseValue.name === req.query[key]) {
                        return res.json({ responseValue }); 
                    } else if (responseValue.id === req.query[key]) {
                      return res.json({ responseValue }); 
                    } else if (responseValue.company === req.query[key]) {
                      responseArray.push(responseValue); 
                    } else if (responseValue.active.toString() === req.query[key]) {
                      responseArray.push(responseValue); 
                    }
                }
            }
        }
        if (responseArray.length < 1) {
          return res.json({ message: 'Data not found. Please try again...' })
        } else {
          return res.json({ responseArray }); 
        }
    })
    .catch(function (error) {
        // console.log(error);
        return res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/capsules/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            //print req.params
            // console.log('req.params', req.params);
            // console.log('api response', response.data);
            //run a for loop to search based of the key form req.params
            const capsuleArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let capsule = response.data[i];
                let userRequest = req.params['0'].split('/') // ['serial', 'C103'] ['reuse_count', '0'] parsing => getting to the format that will serve us

                if (userRequest[0] === 'serial') {
                    if (capsule.serial === userRequest[1].toUpperCase()) {
                        return res.json({ capsule });
                    }
                } else if (userRequest[0] === 'type') {
                    if (capsule.type === userRequest[1]) {
                        return res.json({ capsule });
                    }
                } else if (userRequest[0] === 'id') {
                    if (capsule.id === userRequest[1]) {
                        return res.json({ capsule });
                    }
                } else if (userRequest[0] === 'latest_update') {
                    if (capsule.latest_update === userRequest[1]) {
                        return res.json({ capsule });
                    }
                } else if (userRequest[0] === 'reuse_count') {
                    // check to see which capsules have the reuse count
                    // quesiton: is the value of reuse_count a string or number when it comes in
                    let countValue = parseInt(userRequest[1]) // or Number(userRequest[1])
                    // check the countValue
                    if (capsule.reuse_count === countValue) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'land_landings') {
                    let landValue = parseInt(userRequest[1])
                    if (capsule.land_landings === landValue) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'water_landings') {
                    let waterValue = parseInt(userRequest[1])
                    if (capsule.water_landings === waterValue) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'status') {
                    if (capsule.status === userRequest[1]) {
                        capsuleArray.push(capsule);
                    }
                } else {
                    return res.json({ message: 'Data is not found, please try again' })
                }
            }
            if (capsuleArray.length < 1) {
                return res.json({ message: 'Data is not found, please try again' })
            } else {
                return res.json({ capsules: capsuleArray });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
})


app.get('/company', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
        .then(function (response) {
            res.json({ data: response.data })
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});


app.get('/cores', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            // console.log(response.data);
            // const coresData = response.data
            // coresData.forEach(core => {
            //     // console.log(core);
            // })
            res.render('cores', { cores: response.data })
        })
        .catch(function (error) {
            res.render('cores', { message: 'Data not found. Please try again later.' });
        });
});
app.get('/cores/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            const coresArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let core = response.data[i];
                let userRequest = req.params['0'].split('/');

                if (userRequest[0] === 'status') {
                    if (core.status === userRequest[1]) {
                        coresArray.push(core);
                    }
                } else if (userRequest[0] === 'reuse_count') {
                    let countValue = parseInt(userRequest[1])
                    if (core.reuse_count === countValue) {
                        coresArray.push(core);
                    }
                }
                else if (userRequest[0] === 'asds_attempts') {
                    let countValue = parseInt(userRequest[1])
                    if (core.asds_attempts === countValue) {
                        coresArray.push(core);
                    }
                }
                else if (userRequest[0] === 'id') {
                    if (core.id === userRequest[1]) {
                        return res.json({ core });
                    }
                }
                else if (userRequest[0] === 'serial') {
                    let split = userRequest[1].split('');
                    let finalSplit = split[0].toUpperCase() + split.splice(1).join('');
                    if (core.serial === finalSplit) {
                        return res.json({ core });
                    }
                } else {
                    return res.json({ message: 'Core does not exist' })
                }
            }
            if (coresArray.length < 1) {
                return res.json({ message: 'Data is not found, please try again' })
            } else {
                return res.json({ cores: coresArray });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/crew', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {
            res.render('crew', { crews: response.data })
        })
        .catch(function (error) {
            res.render('crew', { message: 'Data not found. Please try again later.' });
        });
});

// app.get('/crew/:status', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/crew')
//     .then(function (response) {
//         for(let i = 0; i < response.data.length; i++) {
//             let crewStatus = response.data[i];
//             let finalStatus = req.params.serial
//         }
//         res.json({ data: response.data })
//     })
//     .catch(function (error) {
//         res.json({ message: 'Data not found. Please try again later.' });
//     }); 
// });

app.get('/dragons', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            // console.log(response.data);
            // const dragonsData = response.data
            // dragonsData.forEach(dragon => {
            //     // console.log(dragon);
            // })
            res.render('dragons', { dragons: response.data })
        })
        .catch(function (error) {
            res.render('dragons', { message: 'Data not found. Please try again later.' });
        });
});

app.get('/dragons/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            const dragonsArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let dragon = response.data[i];
                let userRequest = req.params['0'].split('/');

                if (userRequest[0] === 'name') {
                    if (dragon.name === userRequest[1]) {
                        return res.json({ dragon })
                    }
                } else if (userRequest[0] === 'type') {
                    if (dragon.type === userRequest[1]) {
                        return res.json({ dragon })
                    }
                } else if (userRequest[0] === 'active') {
                    if (dragon.active === Booelan(userRequest[1].toLowerCase())) {
                        dragonsArray.push(dragon);
                    }
                } else if (userRequest[0] === 'crew_capacity') {
                    let countValue = parseInt(userRequest[1])
                    if (dragon.crew_capacity === countValue) {
                        dragonsArray.push(dragon);
                    }
                } else if (userRequest[0] === 'orbit_duration_yr') {
                    let countValue = parseInt(userRequest[1])
                    if (dragon.orbit_duration_yr === countValue) {
                        dragonsArray.push(dragon);
                    }
                } else {
                    return res.json({ message: 'Dragon does not exist' })
                }
            }
            if (dragonsArray.length < 1) {
                return res.json({ message: 'Data is not found, please try again' })
            } else {
                return res.json({ dragons: dragonsArray });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/history', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/history')
        .then(function (response) {
            res.render('history', { history: response.data })
        })
        .catch(function (error) {
            res.render('history', { message: 'Data not found. Please try again later.' });
        });
});

app.get('/landpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            // console.log(response.data);
            // const landpadsData = response.data
            // landpadsData.forEach(landpad => {
            //     // console.log(landpad);
            // })
            res.render('landpads', { landpads: response.data })
        })
        .catch(function (error) {
            res.render('landpads', { message: 'Data not found. Please try again later.' });
        });
});

app.get('/landpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            const landpadsArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let landpad = response.data[i];
                let userRequest = req.params['0'].split('/');

                if (userRequest[0] === 'name') {
                    if (landpad.name === userRequest[1].toUpperCase()) {
                        return res.json({ landpad })
                    }
                } else if (userRequest[0] === 'status') {
                    if (landpad.status === userRequest[1]) {
                        landpadsArray.push(landpad);
                    }
                } else if (userRequest[0] === 'type') {
                    if (landpad.type === userRequest[1].toUpperCase()) {
                        landpadsArray.push(landpad);
                    }
                } else if (userRequest[0] === 'landing_attempts') {
                    let countValue = parseInt(userRequest[1])
                    if (landpad.landing_attempts === countValue) {
                        return res.json({ landpad });
                    }
                } else if (userRequest[0] === 'landing_successes') {
                    let countValue = parseInt(userRequest[1])
                    if (landpad.landing_successes === countValue) {
                        return res.json({ landpad });
                    }
                } else {
                    return res.json({ message: 'Landpad does not exist' })
                }
            }
            if (landpadsArray.length < 1) {
                return res.json({ message: 'Data is not found, please try again' })
            } else {
                return res.json({ landpads: landpadsArray });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/launches', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {
            // console.log(response.data);
            const launchesData = response.data
            launchesData.forEach(launch => {
                // console.log(launch); // fetch data from routes that end in S
            })
            res.render('launches', { launches: response.data })
        })
        .catch(function (error) {
            res.render('launches', { message: 'Data not found. Please try again later.' });
        });
});

app.get('/launches/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {
            const launchesArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let launch = response.data[i];
                let userRequest = req.params['0'].split('/');

                if (userRequest[0] === 'name') {
                    if (launch.name === userRequest[1]) {
                        return res.json({ launch })
                    }
                } else if (userRequest[0] === 'flight_number') {
                    if (launch.flight_number === userRequest[1]) {
                        res.json({ launch });
                    }
                } else if (userRequest[0] === 'launchpad') {
                    if (launch.launchpad === userRequest[1]) {
                        return res.json({ launch });
                    }
                } else if (userRequest[0] === 'upcoming') {
                    if (launch.upcoming === userRequest[1]) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'success') {
                    if (launch.success === userRequest[1]) {
                        launchesArray.push(launch);
                    }
                } else {
                    return res.json({ message: 'Launch does not exist' })
                }
            }
            if (launchesArray.length < 1) {
                return res.json({ message: 'Data is not found, please try again' })
            } else {
                return res.json({ launches: launchesArray });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/launchpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            // console.log(response.data);
            const launchpadsData = response.data
            launchpadsData.forEach(launchpad => {
                // console.log(launchpad);
            })
            res.render('launchpads', { launchpads: response.data })
        })
        .catch(function (error) {
            res.render('launchpads', { message: 'Data not found. Please try again later.' });
        });
});
app.get('/launchpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            const launchpadsArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let launchpad = response.data[i];
                let userRequest = req.params['0'].split('/');

                if (userRequest[0] === 'name') {
                    if (launchpad.name === userRequest[1].toUpperCase()) {
                        return res.json({ launchpad })
                    }
                } else if (userRequest[0] === 'status') {
                    if (launchpad.status === userRequest[1]) {
                        launchpadsArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'id') {
                    if (launchpad.id === userRequest[1]) {
                        return res.json({ launchpad });
                    }
                } else if (userRequest[0] === 'launch_attempts') {
                    let countValue = parseInt(userRequest[1])
                    if (launchpad.launch_attempts === countValue) {
                        return res.json({ launchpad });
                    }
                } else if (userRequest[0] === 'launch_successes') {
                    let countValue = parseInt(userRequest[1])
                    if (launchpad.launch_successes === countValue) {
                        return res.json({ launchpad });
                    }
                } else {
                    return res.json({ message: 'Launchpad does not exist' })
                }
            }
            if (launchpadsArray.length < 1) {
                return res.json({ message: 'Data is not found, please try again' })
            } else {
                return res.json({ launchpads: launchpadsArray });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/payloads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            // console.log(response.data);
            const payloadsData = response.data
            payloadsData.forEach(payload => {
                // console.log(payload);
            })
            res.render('payloads', { payloads: response.data })
        })
        .catch(function (error) {
            res.render('payloads', { message: 'Data not found. Please try again later.' });
        });
});
app.get('/payloads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            const payloadsArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let payload = response.data[i];
                let userRequest = req.params['0'].split('/');

                if (userRequest[0] === 'name') {
                    let split = userRequest[1].split('');
                    let finalSplit = split[0].toUpperCase() + split.splice(1).join('');
                    if (payload.name === finalSplit) {
                        return res.json({ payload })
                    }
                } else if (userRequest[0] === 'reused') {
                    if (payload.reused === userRequest[1].toLowerCase()) {
                        payloadsArray.push(payload);
                    }
                } else if (userRequest[0] === 'launch') {
                    if (payload.launch === userRequest[1].toLowerCase) {
                        return res.json({ payload });
                    }
                } else if (userRequest[0] === 'id') {
                    if (payload.id === userRequest[1]) {
                        return res.json({ payload });
                    }
                } else if (userRequest[0] === 'type') {
                    if (payload.type === userRequest[1]) {
                        payloadsArray.push(payload);
                    }
                } else {
                    return res.json({ message: 'Payload does not exist' })
                }
            }
            if (payloadsArray.length < 1) {
                return res.json({ message: 'Data is not found, please try again' })
            } else {
                return res.json({ payloads: payloadsArray });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/roadster', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/roadster')
        .then(function (response) {
            res.render('roadster', { roadster: response.data })
        })
        .catch(function (error) {
            res.render('roadster', { message: 'Data not found. Please try again later.' });
        });
});

app.get('/rockets', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            // console.log(response.data);
            const rocketsData = response.data
            rocketsData.forEach(rocket => {
                // console.log(rocket);
            })
            res.render('rockets', { rockets: response.data })
        })
        .catch(function (error) {
            res.render('rockets', { message: 'Data not found. Please try again later.' });
        });
});
app.get('/rockets/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            const rocketsArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let rocket = response.data[i];
                let userRequest = req.params['0'].split('/');

                if (userRequest[0] === 'name') {
                    let split = userRequest[1].split('');
                    let finalSplit = split[0].toUpperCase() + split.splice(1).join('');
                    if (rocket.name === finalSplit) {
                        return res.json({ rocket })
                    }
                } else if (userRequest[0] === 'active') {
                    if (rocket.active === Boolean(userRequest[1].toLowerCase())) {
                        rocketsArray.push(rocket);
                    }
                } else if (userRequest[0] === 'boosters') {
                    if (rocket.boosters === parseInt(userRequest[1])) {
                        return res.json({ rocket });
                    }
                } else if (userRequest[0] === 'id') {
                    if (rocket.id === userRequest[1]) {
                        return res.json({ rocket });
                    }
                } else if (userRequest[0] === 'type') {
                    if (rocket.type === userRequest[1].toLowerCase()) {
                        rocketsArray.push(rocket);
                    }
                } else {
                    return res.json({ message: 'Rocket does not exist' })
                }
            }
            if (rocketsArray.length < 1) {
                return res.json({ message: 'Data is not found, please try again' })
            } else {
                return res.json({ rockets: rocketsArray });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/ships', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            // console.log(response.data);
            const shipsData = response.data
            shipsData.forEach(ship => {
                // console.log(ship);
            })
            res.render('ships', { ships: response.data })
        })
        .catch(function (error) {
            res.render('ships', { message: 'Data not found. Please try again later.' });
        });
});

app.get('/ships/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            const shipsArray = [];
            console.log('ship data=>', response.data)
            for (let i = 0; i < response.data.length; i++) {
                let ship = response.data[i];
                let userRequest = req.params['0'].split('/');

                if (userRequest[0] === 'name') {
                    let split = userRequest[1].split('');
                    let finalSplit = split[0].toUpperCase() + split.splice(1).join('');
                    if (ship.name === finalSplit) {
                        return res.render('showships',{ ship })
                        // ship.param 
                    }
                } else if (userRequest[0] === 'active') {
                    if (ship.active === Boolean(userRequest[1].toLowerCase())) {
                         shipsArray.push(ship);
                        
                    }
                } else if (userRequest[0] === 'year_built') {
                    if (ship.year_built === parseInt(userRequest[1])) {
                        return res.render('showships',{ ship });
                    }
                } else if (userRequest[0] === 'id') {
                    if (ship.id === userRequest[1]) {
                        return res.render('showships', { ship });
                    }
                } else if (userRequest[0] === 'type') {
                    let split = userRequest[1].split('');
                    let finalSplit = split[0].toUpperCase() + split.splice(1).join('');
                    if (ship.type === finalSplit) {
                        shipsArray.push(ship);
                    }
                } else {
                    return res.render('showships', { message: 'Ship does not exist' })
                }
            }
            if (shipsArray.length < 1) {
                return res.render('showships', { message: 'Ship is not found, please try again' })
            } else {
                return res.render('showships', { ships: shipsArray });
                //ships.ships.map
                // if ships then ships.ships.map
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/starlink', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            res.render('starlink', { starlink: response.data })
        })
        .catch(function (error) {

            res.render('starlink', { message: 'Data not found. Please try again later.' });
        });
});

// app.get("/search", (req, res) => {
//     let printout = '';
//     console.log('Query', req.query)
//     for (let key in req.query) {
//         printout += key + ": " + req.query[key] + "<br />";
//     }
//     res.send("Here's what they sent: <br /><br />" + printout);
// });




app.get('/:input', function (req, res) {
    // app.get('*', function(req, res){ // covers all routes
    // must be placed in the end
    console.log('INPUT =>', req.params)
    res.json({ message: 'Testing /:input' })
    res.json({ message: `There is no data for / ${req.params.input}` })
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log(`Server is running on PORT`, PORT);
});

module.exports = {
    app,
    PORT
}