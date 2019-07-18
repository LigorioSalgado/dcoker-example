const { GraphQLServer } =  require('graphql-yoga');
const mongoose =  require('mongoose');


const UserSchema =  new mongoose.Schema({
	name:{
		type:String
	},
	email:{
		type:String,
		unique:true,
		required:true
	},
	age:{
		type:Number
	}
})

const User = mongoose.model('user',UserSchema);

mongoose.connect('mongodb://mongo:27017/myDB',{ useNewUrlParser: true })

const mongo =  mongoose.connection;

mongo.on('error', (err) => console.log(err))

const resolvers = {
	Query:{
		users: async() => await User.find({}) ,	
	},
	Mutation:{
		create: async(root,params) => await User.create(params.data)
	}	
}
const typeDefs = `

	type Query{
		users:[User]
	}

	type Mutation{
		create(data:createUser!):User
	}

	type User{
		_id:ID!
		name:String!
		email:String!
		age:Int!
	}

	input createUser {
		name:String!
		email:String!
		age:Int!
	}

`



const server = new GraphQLServer({
	typeDefs,
	resolvers
})

module.exports =  server;
