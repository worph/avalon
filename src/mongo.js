var db_name = process.env.DB_NAME || 'avalon';
var db_url = process.env.DB_URL || 'mongodb://localhost:27017';
var MongoClient = require('mongodb').MongoClient;

var mongo = {
    init: (cb) => {
        MongoClient.connect(db_url, { useNewUrlParser: true }, function(err, client) {
            if (err) throw err;
            this.db = client.db(db_name)
            logr.info("Connected to "+db_url+"/"+this.db.databaseName)

            // init genesis account if no account
            db.collection('accounts').findOne({}, function(err, acc) {
                if (err) throw err;

                if (acc) {
                    cb()
                    return
                }

                logr.debug('NEW CHAIN !!')
                
                if (!acc) {
                    db.collection('accounts').insertOne({
                        name: 'master',
                        pub: 'eLzHSXuEp9mSc6wApDR5WZZJmFFq6WqXzAW6XbThaKF3',
                        balance: 1000000,
                        bw: {v:0,t:0},
                        vt: {v:0,t:0},
                        pr: {v:0,t:0},
                        uv: 0,
                        // we set those arbitrarily
                        approves: ['master'],
                        node_appr: 1000000
                    })
                    // then init genesis block if no block
                    db.collection('blocks').findOne({}, function(err, block) {
                        if (err) throw err;
                        if (!block) {
                            var block = chain.getGenesisBlock()
                            db.collection('blocks').insertOne(block, function() {
                                cb()
                            })
                        } else {
                            cb()
                        }
                    })
                }
            })
            
        });
    },
    fillInMemoryBlocks: (cb) => {
        db.collection('blocks').find({}, {
            sort: {_id: -1},
            limit: 100
        }).toArray(function(err, blocks) {
            if (err) throw err;
            chain.recentBlocks = blocks.reverse()
            cb()
        })
    }
} 

module.exports = mongo