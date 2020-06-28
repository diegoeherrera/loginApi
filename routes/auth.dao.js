const mongoose = require('mongoose');
//estrutura de mi usuario
const authSchema = require('./auth.model');

//accedo al modelo
authSchema.statics = {

    create:function(data,cb){
        //retorna una instancia del modelo para poder usasr su metodo save(que creo mas abajo para poder hacer user.save())  
        console.log("this es: ", new this(data)," user  es :", this)
        const user = new this(data)
        //
        user.save(cb);
    },
    login:function(query,cb){
        this.find(query,cb)
    }
}

const authModel = mongoose.model('Users', authSchema);

module.exports = authModel;


/*

Schema.prototype.post()
Parameters
The «String|RegExp» method name or regular expression to match method name
[options] «Object»
[options.document] «Boolean» If name is a hook for both document and query middleware, set to true to run on document middleware.
[options.query] «Boolean» If name is a hook for both document and query middleware, set to true to run on query middleware.
fn «Function» callback
Defines a post hook for the document

var schema = new Schema(..);
schema.post('save', function (doc) {
  console.log('this fired after a document was saved');
});

schema.post('find', function(docs) {
  console.log('this fired after you ran a find query');
});

schema.post(/Many$/, function(res) {
  console.log('this fired after you ran `updateMany()` or `deleteMany()`);
});

var Model = mongoose.model('Model', schema);

var m = new Model(..);
m.save(function(err) {
  console.log('this fires after the `post` hook');
});

m.find(function(err, docs) {
  console.log('this fires after the post find hook');
});


*/