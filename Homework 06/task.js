function generateForm() {
	let btnGenerateForm = document.getElementById('btnGenerateForm');
	btnGenerateForm.style.display = 'none';

	let form = document.createElement('form');

	addInputField('Фамилия', 'text', 'surname', '', 'idSurname', form);
	addBr(form);
	addInputField('Имя', 'text', 'name', '', 'idName', form);
	addBr(form);
	addInputField('Отчество', 'text', 'patronym', '', 'idPatronym', form);
	addBr(form);
	addInputField('Дата рождения', 'text', 'birthDate', '', 'idBirthDate', form)
	addBr(form);

	addInputField('Пол', 'radio', 'gender', 'Мужской', 'idMale', form);
	form.appendChild(createLabel('Мужской', 'idMale'));
	addInputField('', 'radio', 'gender', 'Женский', 'idFemale', form);
	form.appendChild(createLabel('Женский', 'idFemale'));
	addBr(form);

	addInputField('Курс', 'number', 'course', '1', 'idCourse', form);
	addBr(form);
	let divSlider = document.createElement('div');
	divSlider.id = 'courseSlider';
	form.appendChild(divSlider);
	addBr(form);

	addInputField('Введите ВУЗ', '', 'university', '', 'idUniversity', form);
	form.elements.university.addEventListener('change', changeFaculties);
	addBr(form);

	form.appendChild(createLabel('Выберите факультет'));
	addBr(form);
	let facultySelect = createSelect([]);
	facultySelect.name = 'faculty';
	facultySelect.value = '';
	facultySelect.id = 'facultySelect';
	form.appendChild(facultySelect);
	addBr(form);

	addInputField('Заочно', 'checkbox', 'absentia', '', 'idAbsentia', form);
	addBr(form);

	form.appendChild(createLabel('О себе'));
	addBr(form);
	let aboutTextarea = document.createElement('textarea');
	aboutTextarea.name = 'about';
	form.appendChild(aboutTextarea);
	addBr(form);

	let btnSend = document.createElement('button');
	btnSend.innerHTML = 'Отправить';
	btnSend.id = 'idBtnSend';
	btnSend.addEventListener('click', showInfo);
	form.appendChild(btnSend);

	document.body.appendChild(form);

	addUIWidget($("#idBirthDate"), $().datepicker);
	addUIWidget($("#courseSlider"), $().slider, {
		value: 1,
		min: 1,
		max: 5,
		step: 1,
		slide: function(event, ui) {
			$("input[name=course]").val(ui.value);
		}
	});
	addUIWidget($("#idAbsentia"), $().checkboxradio, {icon: false});
	addUIWidget($("#idBtnSend"), $().button);
	addUIWidget($("#facultySelect"), $().selectmenu);
	addUIWidget($("#idUniversity"), $().autocomplete, {source: ['БГУИР', 'БГУ', 'БНТУ']});
}

function addUIWidget(element, widget, params) {
	$(function() {
		widget.call(element, params);
	});
}

function createLabel(text, inputFor) {
	let label = document.createElement('label');
	label.htmlFor = inputFor;
	label.innerHTML = text;
	return label;
}

function createInput(type, name, value, inputID) {
	let input = document.createElement('input');
	input.id = inputID;
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

function addInputField(labelName, inputType, inputName, inputValue, inputID, form) {
	let label = createLabel(labelName, inputID);
	let input = createInput(inputType, inputName, inputValue, inputID);
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
	let facultySelect = form.elements.faculty;
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

	$("#facultySelect").selectmenu("refresh");
}

function showInfo(event) {
	event.preventDefault();
	let form = document.querySelector('form');

	let surname = form.elements.surname.value;
	let name = form.elements.name.value;
	let patronym = form.elements.patronym.value;
	let birthDate = form.elements.birthDate.value;
	let gender = form.elements.gender.value;
	let course = form.elements.course.value;
	let university = form.elements.university.value;
	let faculty = form.elements.faculty.value;
	let absentia = form.elements.absentia.checked ? 'Да' : 'Нет';
	let about = form.elements.about.value;

	let pattern = `${surname} ${name} ${patronym}
		Дата рождения: ${birthDate}
		Пол: ${gender}
		Университет: ${university}
		Факультет: ${faculty}
		Курс: ${course}
		Заочно: ${absentia}
		О себе: ${about}`;
	
	alert(pattern);
}
