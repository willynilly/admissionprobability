function probTwo(prA, prB) {
	return prA + prB - (prA * prB);
}

function probArray(prArray) {
	if (!prArray || prArray.length === 0) {
		return undefined;
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

module.exports = {
	getProbabilityOfAdmissionToAtLeastOneSchool: getProbabilityOfAdmissionToAtLeastOneSchool,
};