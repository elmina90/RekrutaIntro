var CandidateProperties = {

    readAll:function (req,res) {
    	// Default generated attributes : id, createdAt, and updatedAt
    	// Filtered with select to return specific attribute
    	Candidate.find({}, {select: ['name', 'email']}).exec(function (err, candidates) {
	        return res.json({
	          candidates: candidates
	        });
        });
  	} 
};

module.exports = CandidateProperties;