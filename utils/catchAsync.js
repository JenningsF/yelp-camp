// Local utility to catch async functions

module.exports = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch(next);
	};
};
