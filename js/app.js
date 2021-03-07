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


// Array with all DOM section objects
const sections = document.querySelectorAll('section');

// Array with all DOM section title objects (h2)
const section_titles = document.querySelectorAll('h2');

const scroll_to_section = function (number) {
	/**
	* Result: Scrolls page to the start of the section given by number
	* Inputs:
	* 	number: Position of section in array
	*/
	section_title = section_titles[number];
	position = section_title.getBoundingClientRect();
	window.scrollBy({
		top: position.y - section_title.offsetHeight - 50,
		left: 0,
		behavior: 'smooth'
	});
};

const activate_section = function () {
	/**
	* Result: 
	*	Activates the closest section (approximately) below the current window position.
	*	It also deactivates the previous active section.
	*	Activation corresponds to adding class your-active-class to the classList of the section.
	*/

	let min_distance = document.body.scrollHeight;
	let active_section = {};
	let active_section_number = 1;
	// Find new active section
	for (let i = 0; i < sections.length; i++) {
		section = sections[i];
		position = section.getBoundingClientRect();
		// Top of the page is not passed the title (with adjustment)
		if (position.y + 100 > 0) {
			// lowest distance until now
			if (position.y < min_distance) {
				min_distance = position.y;
				active_section = section;
				active_section_number = i;
			}
		}
	}
	// Activate section
	if (!active_section.classList.contains("your-active-class")) {
		active_section.classList.add("your-active-class");
	}
	// Deactivate other sections
	for (let i = 0; i < sections.length; i++) {
		section = sections[i];
		if (section !== active_section) {
			if (section.classList.contains("your-active-class")) {
				section.classList.remove("your-active-class");
			}
		}
	}
	// Activate section in nav bar
	navbar_li_elements = document.getElementById("navbar__list").querySelectorAll('li')
	navbar_li_elements[active_section_number].classList.add("active-nav-section")
	// Deactivate section in nav bar
	for (let i = 0; i < sections.length; i++) {
		if (i != active_section_number) {
			if (navbar_li_elements[i].classList.contains("active-nav-section")) {
				navbar_li_elements[i].classList.remove("active-nav-section");
			}
		}
	}	


};


// Dynamically build the navigation bar based on the sections on the HTML
const navbar = document.getElementById("navbar__list")
for (let i = 0; i < section_titles.length; i++) {

	// Build the nav
	const li = document.createElement("li");
	section_title_text = section_titles[i].innerText
	li.appendChild(document.createTextNode(section_title_text));
	navbar.appendChild(li);

	// Scroll to section on link click
	li.addEventListener('click',  () => {scroll_to_section(i)});
}

// Have section 1 activated at inception
activate_section();


// Add class 'active' to section when near top of viewport
document.addEventListener('scroll',  activate_section);




