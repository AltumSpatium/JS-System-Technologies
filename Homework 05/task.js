function generateForm() {
	let btnGenerateForm = document.getElementById('btnGenerateForm');
	btnGenerateForm.style.display = 'none';

	let form = document.createElement('form');

	addInputField('Фамилия', 'text', 'surname', '', form);
	addBr(form);
	addInputField('Имя', 'text', 'name', '', form);
	addBr(form);
	addInputField('Отчество', 'text', 'patronym', '', form);
	addBr(form);

	addInputField('Пол', 'radio', 'gender', 'Мужской', form);
	form.appendChild(document.createTextNode('Мужской'));
	addInputField('', 'radio', 'gender', 'Женский', form);
	form.appendChild(document.createTextNode('Женский'));
	addBr(form);

	addInputField('Курс', 'number', 'course', '1', form);
	addBr(form);

	form.appendChild(createLabel('Выберите ВУЗ'));
	addBr(form);
	let universitySelect = createSelect(['БГУИР', 'БГУ', 'БНТУ']);
	universitySelect.name = 'university';
	universitySelect.value = '';
	universitySelect.onchange = changeFaculties;
	form.appendChild(universitySelect);
	addBr(form)

	form.appendChild(createLabel('Выберите факультет'));
	addBr(form);
	let facultySelect = createSelect([]);
	facultySelect.name = 'faculty';
	facultySelect.value = '';
	facultySelect.id = 'facultySelect';
	form.appendChild(facultySelect);
	addBr(form);

	addInputField('Заочно', 'checkbox', 'absentia', '', form);
	addBr(form);

	form.appendChild(createLabel('О себе'));
	addBr(form);
	let aboutTextarea = document.createElement('textarea');
	aboutTextarea.name = 'about';
	form.appendChild(aboutTextarea);
	addBr(form);

	let btnSend = document.createElement('button');
	btnSend.innerHTML = 'Отправить';
	btnSend.onclick = showInfo;
	form.appendChild(btnSend);

	document.body.appendChild(form);
}

function createLabel(text) {
	let label = document.createElement('label');
	label.innerHTML = text;
	return label;
}

function createInput(type, name, value) {
	let input = document.createElement('input');
	input.name = name;
	input.value = value;
	input.type = type;
	return input;
}

function createSelect(options) {
	let select = document.createElement('select');
	for (let optionText of options) {
		let option = document.createElement('option');
		option.innerHTML = optionText;
		select.appendChild(option);
	}
	return select;
}

function addInputField(labelName, inputType, inputName, inputValue, form) {
	let label = createLabel(labelName);
	let input = createInput(inputType, inputName, inputValue);
	form.appendChild(label);
	form.appendChild(document.createElement('br'));
	form.appendChild(input);
}

function addBr(form) {
	form.appendChild(document.createElement('br'));
}

function changeFaculties() {
	let form = document.querySelector('form');
	let university = form.elements.university.value;
	let facultySelect = form.elements.facultySelect;
	let faculties = [];

	switch(university) {
		case 'БГУИР':
			faculties = ['ФКСиС', 'ФИТиУ', 'ФКП', 'ФТК', 'ФРЭ', 'ИЭФ'];
			break;
		case 'БГУ':
			faculties = ['Биологический', 'Географический', 'Исторический', 'Химический',
				'Физический', 'Экономический', 'Филологический', 'Юридический'];
			break;
		case 'БНТУ':
			faculties = ['АТФ', 'ФГДЭ', 'МСФ', 'МТФ', 'ФММП', 'ЭФ', 'ФИТР', 'ФТУГ', 'ИПФ', 'ФЭС',
				'АФ', 'СФ', 'ПСФ', 'ФТК', 'ВТФ', 'СТФ'];
			break;
	}

	let length = facultySelect.options.length;
	for (let i = length - 1; i >= 0; i--) {
		facultySelect.remove(i);
	}

	for (let faculty of faculties) {
		let option = document.createElement('option');
		option.text = faculty;
		facultySelect.add(option);
	}
}

function showInfo(event) {
	let form = document.querySelector('form');

	let surname = form.elements.surname.value;
	let name = form.elements.name.value;
	let patronym = form.elements.patronym.value;
	let gender = form.elements.gender.value;
	let course = form.elements.course.value;
	let university = form.elements.university.value;
	let faculty = form.elements.faculty.value;
	let absentia = form.elements.absentia.checked ? 'Да' : 'Нет';
	let about = form.elements.about.value;

	let pattern = `${surname} ${name} ${patronym}
		Пол: ${gender}
		Университет: ${university}
		Факультет: ${faculty}
		Курс: ${course}
		Заочно: ${absentia}
		О себе: ${about}`;
	
	alert(pattern);
	event.preventDefault();
}
