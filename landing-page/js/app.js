/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


const sections = document.querySelectorAll('section');
const section_titles = document.querySelectorAll('h2'); // not elegant, but works for the page

const scroll_to_section = function (number) {
	section_title = section_titles[number];
	position = section_title.getBoundingClientRect();
	window.scrollBy({
		top: position.y - section_title.offsetHeight - 50,
		left: 0,
		behavior: 'smooth'
	});
};

const activate_section = function () {
	let min_distance = document.body.scrollHeight;
	let active_section = {};
	// find new active section
	for (let i = 0; i < sections.length; i++) {
		section = sections[i];
		position = section.getBoundingClientRect();
		// top of the page is not passed the title
		if (position.y + 100 > 0) {
			// lowest distance until now
			if (position.y < min_distance) {
				min_distance = position.y;
				active_section = section;
			}
		}
	}
	// activate section
	if (!active_section.classList.contains("your-active-class")) {
		active_section.classList.add("your-active-class");
	}
	// deactivate other sections
	for (let i = 0; i < sections.length; i++) {
		section = sections[i];
		if (section !== active_section) {
			if (section.classList.contains("your-active-class")) {
				section.classList.remove("your-active-class");
			}
		}
	}
};

const navbar = document.getElementById("navbar__list")
for (let i = 0; i < section_titles.length; i++) {

	// build the nav
	const li = document.createElement("li");
	section_title_text = section_titles[i].innerText
	li.appendChild(document.createTextNode(section_title_text));
	navbar.appendChild(li);

	// Scroll to section on link click
	li.addEventListener('click',  () => {scroll_to_section(i)});
}


// Add class 'active' to section when near top of viewport
document.addEventListener('scroll',  activate_section);




