(function(){
    fetch('resume.json').then(function (response) {
        return (response.ok) ? response.json() : Promise.reject(response);
    }).then(function(response) {
		/* summary */
		document.getElementById('summary').innerText = response.basics.summary;

        /* skills */
        var skillTemplate = document.getElementById('skill-template');
        for(var i in response.skills){
            var newSkill = document.importNode(skillTemplate.content, true);
            newSkill.querySelector('article h3').innerText = response.skills[i].name;
            for(var j in response.skills[i].keywords){
                var newKeyword = document.createElement('li');
                newKeyword.innerHTML = '<i class="fa fa-chevron-right"></i> ' + response.skills[i].keywords[j];
                newSkill.querySelector('article ul').append(newKeyword);
            }
            document.getElementById('skills').appendChild(newSkill);
        }
		
		/* experience */
        var experienceTemplate = document.getElementById('experience-template');
        for(var i in response.work) {
            var newExperience = document.importNode(experienceTemplate.content, true);
            newExperience.querySelector('article .disk').innerText = response.work[i].startDate.replace(/\D*/, '');
            newExperience.querySelector('article h3').innerText = response.work[i].company;
            newExperience.querySelector('article h4').innerText = response.work[i].position;
            newExperience.querySelector('article p').innerText = response.work[i].summary;
            for(var j in response.work[i].highlights){
                var newKeyword = document.createElement('li');
                newKeyword.innerHTML = '<i class="fa fa-chevron-right"></i> ' + response.work[i].highlights[j] ;
                newExperience.querySelector('article ul').append(newKeyword);
            }
            document.getElementById('experience').appendChild(newExperience);
        }
		
		/* education */
        var newEducation = document.importNode(experienceTemplate.content, true);
        newEducation.querySelector('article .disk').innerText = response.education[0].endDate.replace(/\D*/, '');
        newEducation.querySelector('article h3').innerText = response.education[0].institution;
        newEducation.querySelector('article h4').innerText = response.education[0].area;
        newEducation.querySelector('article p').remove();
        for(var j in response.education[0].courses){
            var newKeyword = document.createElement('li');
            newKeyword.innerHTML = '<i class="fa fa-chevron-right"></i> ' + response.education[0].courses[j] ;
            newEducation.querySelector('article ul').append(newKeyword);
        }
        document.getElementById('education').appendChild(newEducation);
		
		/* references */
        var referenceTemplate = document.getElementById('reference-template');
        for(var i in response.references){
            var newReference = document.importNode(referenceTemplate.content, true);
            newReference.querySelector('article a').setAttribute('href', response.references[i].website);
            newReference.querySelector('article img').setAttribute('src', response.references[i].logo);
            newReference.querySelector('article img').setAttribute('alt', response.references[i].name);
            newReference.querySelector('article img').setAttribute('title', response.references[i].name);
            document.getElementById('references').appendChild(newReference);
        }
	});
}());
