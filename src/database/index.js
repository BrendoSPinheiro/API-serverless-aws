const AWS = require("aws-sdk");

exports.db = new AWS.DynamoDB.DocumentClient();
