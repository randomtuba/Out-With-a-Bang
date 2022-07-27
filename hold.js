var interval = false
var time = 0

function startHold(x) {
				if (!interval) {
					var interval = setInterval((function() {
						if(time >= 5)
						  x;
						time += 1
					}), 50)}
			}

function stopHold() {
	clearInterval(interval)
		interval = false
		time = 0
  }