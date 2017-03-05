/**
 * @author Cyril Vermande
 * @copyright All right reserved 2017 Cyril Vermande
 */

(function(){
	$.getJSON('https://raw.githubusercontent.com/cyve/resume/master/resume.json', function(response){
		/* summary */
		$('#summary').prepend(response.basics.summary);
		
		/* experience */
		var experiences = '',
			experienceTemplate = $('#experience-template').html();
		
		response.work.sort(function(a,b){
			return a.startDate < b.startDate;
		});
		
		for(var i in response.work){
			experiences += experienceTemplate
				.replace('{{ year }}', response.work[i].startDate.replace(/\D*/, ''))
				.replace('{{ position }}', response.work[i].position)
				.replace('{{ company }}', response.work[i].company)
				.replace('{{ website }}', response.work[i].website)
				.replace('{{ summary }}', response.work[i].summary)
				.replace('{{ highlights }}', function(){
					var html = '';
					for(var j in response.work[i].highlights){
						html += '<li>' + response.work[i].highlights[j] + '</li>';
					}
					return html;
				})
			;
		}
		
		$('#experience').append(experiences);
		
		/* education */
		var education = experienceTemplate
			.replace('{{ year }}', response.education[0].endDate.replace(/\D*/, ''))
			.replace('{{ position }}', response.education[0].area)
			.replace('{{ company }}', response.education[0].institution)
			.replace('{{ website }}', '#')
			.replace('{{ summary }}', '')
			.replace('{{ highlights }}', function(){
				var html = '';
				for(var j in response.education[0].courses){
					html += '<li>' + response.education[0].courses[j] + '</li>';
				}
				return html;
			})
		;
		
		$('#education').append(education);
		
		/* skills */
		var skills = '',
			skillTemplate = $('#skill-template').html();
		
		for(var i in response.skills){
			skills += skillTemplate
				.replace('{{ name }}', response.skills[i].name)
				.replace('{{ keywords }}', function(){
					var html = '';
					for(var j in response.skills[i].keywords){
						html += '<li>' + response.skills[i].keywords[j] + '</li>';
					}
					return html;
				})
			;
		}
		
		$('#skills').append(skills);
		
		/* references */
		var references = '',
			referenceTemplate = $('#reference-template').html();
		
		for(var i in response.references){
			references += referenceTemplate
				.replace('{{ name }}', response.references[i].name)
				.replace('{{ logo }}', response.references[i].logo)
				.replace('{{ website }}', response.references[i].website)
			;
		}
		
		$('#references').append(references);
	});
	
	$('[data-email=email]').attr('href', function(){
		return ['mail', 'to', ':', 'cyril', '@', 'cyrilwebdesign', '.', 'com'].join('');
	});
}())
