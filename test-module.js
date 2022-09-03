module.exports = () => ({
	name: 'test',
	setup(build) {

		console.log('test module');
		
		build.onEnd(result => {
			console.log(`build ended with ${result.errors.length} errors`)
		})

	}
});