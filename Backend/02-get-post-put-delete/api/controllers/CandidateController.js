var CandidateProperties = {

	// Usage: http://localhost:1337/candidates/readAll
    readAll: function (req,res) {
    	// Default generated attributes : id, createdAt, and updatedAt
    	// Filtered with select to return specific attribute
    	Candidate.find({}, {select: ['name', 'email']})
    	.then(function (candidates) {
           sails.log('Return all candidates');

	        return res.json({
	          AllCandidates: candidates
	        });
        });
  	},

  	// Usage: http://localhost:1337/candidates/add?name=candidate%204&email=candidate4@gmail.com
	add: function (req,res) {
        var name = req.param('name');
		var email = req.param('email');

		Candidate.create({name: name, email: email})
		.then(function (created){
           sails.log('Added candidate : ' + created.name);

           return res.json({
	          addedCandidate: created
	        });
		});
  	},

  	// Usage: http://localhost:1337/candidates/update?targetName=candidate%204&name=candidate%204_updated&email=candidate4_updated@gmail.com
	update: function (req,res) {
		var targetName = req.param('targetName');
        var name = req.param('name');
		var email = req.param('email');

        Candidate.update({name: targetName},{name: name, email: email})
        .then(function (updated){
           updated.forEach(function(value){
           	sails.log('Updated candidate to have name ' + value.name);
           });

           return res.json({
	          updatedCandidate: updated
	        });

        });
  	},

  	// Usage: http://localhost:1337/candidates/delete?targetName=candidate%204_updated
	delete: function (req,res) {
		var targetName = req.param('targetName');

		Candidate.destroy({name: targetName})
		.then(function (deleted){
           deleted.forEach(function(value){
		  	sails.log('Any candidates named '+ value.name +' have now been deleted.');
           });
           	
           	return res.json({
	          deletedCandidate: deleted
	        });
		});
  	}
};

module.exports = CandidateProperties;