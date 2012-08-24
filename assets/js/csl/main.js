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
					page.latency.total = page.latency.total + page.latency.current;
					page.latency.avg = Math.floor((page.latency.count / page.latency.total) * 100);
					page.latency.getTemplate(function(templateToRen) {
						if (!templateToRen) {
							return;
						} else {
							var html = page.render(templateToRen, {
								current: page.latency.current,
								avg: page.latency.avg
							});
							$('.latency').html(html);
							return;
						}
					});
				} else {
					return;
				}
			},
			getTemplate: function(cb) {
				if (!page.latency.template) {
					$.get('/templates/latency.mu.html', function(template) {
						if (template) {
							page.latency.template = template;
							cb(template);
						} else {
							cb(null);
						}
					});
				} else {
					cb(null);
				}
			},
			template: null
		},
		render: function(template, data) {
			var returnHTML = Mustache.to_html(template, data);
			return returnHTML;
		}
	};