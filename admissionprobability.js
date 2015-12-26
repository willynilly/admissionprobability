function probTwo(prA, prB) {
	return prA + prB - (prA * prB);
}

function probArray(prArray) {
	if (!prArray || prArray.length === 0) {
		return 0;
  } else if (prArray.length === 1) {
		return prArray[0];
	} else {
		var lastPr = prArray[0];
		for (var i = 1; i < prArray.length; i++) {
			lastPr = probTwo(lastPr, prArray[i]);
		}
		return lastPr;
	}
}

function getProbabilityOfAdmissionToAtLeastOneSchool(schoolAdmissionProbArray) {
	return probArray(schoolAdmissionProbArray);
}

function getMinSchoolCountForConstantAdmissionProbability(constantProb, minProb) {
	var i = 1;
	var lastProb = constantProb;
	while (lastProb < minProb) {
		lastProb = probTwo(lastProb, constantProb);
		i++;
	}
	return i;
}

function getMinConstantAdmissionProbabilityForSchoolCount(schoolCount, minProbAdmisAtLeastOneSchool, allowedError) {
	var getProbs = function(p) {
		var probs = [];
		for(var i = 0; i < schoolCount; i++) {
			probs.push(p);
		}
		return probs;
	}
	if (minProbAdmisAtLeastOneSchool === undefined) {
		minProbAdmisAtLeastOneSchool = .99;
	}
	if (allowedError === undefined) {
		allowedError = .001;		
	}
	var lowerProb = 0;
	var higherProb = 1;
	var lastConstantProb = .5;
	var lastProbs = getProbs(lastConstantProb);
	var probDiff = getProbabilityOfAdmissionToAtLeastOneSchool(lastProbs) - minProbAdmisAtLeastOneSchool;
	while(probDiff < 0 || probDiff > allowedError) {
		if (probDiff > allowedError) {
			higherProb = lastConstantProb;
		} else {
			lowerProb = lastConstantProb;
		}
		lastConstantProb = (lowerProb + higherProb) / 2.0;
		lastProbs = getProbs(lastConstantProb);
		probDiff = getProbabilityOfAdmissionToAtLeastOneSchool(lastProbs) - minProbAdmisAtLeastOneSchool;
	}
	return lastConstantProb;
}

module.exports = {
	getProbabilityOfAdmissionToAtLeastOneSchool: getProbabilityOfAdmissionToAtLeastOneSchool,
	getMinSchoolCountForConstantAdmissionProbability: getMinSchoolCountForConstantAdmissionProbability,
	getMinConstantAdmissionProbabilityForSchoolCount: getMinConstantAdmissionProbabilityForSchoolCount
};