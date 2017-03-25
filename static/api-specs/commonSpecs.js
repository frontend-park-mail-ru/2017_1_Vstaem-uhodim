/* exported getRandomLogin */
function getRandomLogin() {
	return `${Math.random().toString(36).substring(2, 8)}${Date.now()}`;
}
