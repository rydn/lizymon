	var page = {
		latency: {
			current: 0,
			avg: 0,
			count: 0,
			total: 0,
			update: function(current) {
				if (current) {
					page.latency.current = current;
					page.latency.count++;
					page.latency.total += page.latency.current;
					page.latency.avg = Math.floor((page.latency.count / page.latency.total) * 100);
					page.latency.getTemplate(function(err, template) {
						if (err) {
							console.log(err);
							return false;
						} else {
							var html = page.render(template, {
								current: page.latency.current,
								avg: page.latency.avg
							});
							$('.latency').html(html);
							return true;
						}
					});

				} else {
					return false;
				}
			},
			getTemplate: function(callback) {
				if (!page.latency.template) {
					$.get('/templates/latency.mu.html', function(template) {
						if (template) {
							callback(null, template);
							page.latency.template = template;
						} else {
							callback('no template returned', null);
						}
					});
				} else {
					callback(null, page.latency.template);
				}
			},
			template: null
		},
		render: function(template, data) {
			var returnHTML = Mustache.to_html(template, data);
			return returnHTML;
		}
	};