document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu-toggle');
 const nav=document.querySelector('.desktop-nav');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);menu.setAttribute('aria-label',open?'Відкрити меню':'Закрити меню')})}
 const form=document.querySelector('[data-booking-form]');
 if(!form)return;
 const params=new URLSearchParams(location.search);const property=params.get('property');
 const selector=form.elements.property;if(property&&['bukovel','yablunytsia'].includes(property))selector.value=property;
 const today=new Date();const iso=d=>{const local=new Date(d.getTime()-d.getTimezoneOffset()*60000);return local.toISOString().slice(0,10)};
 const arrival=form.elements.arrival,departure=form.elements.departure;arrival.min=iso(today);departure.min=iso(today);
 arrival.addEventListener('change',()=>{departure.min=arrival.value||iso(today);if(departure.value&&departure.value<=arrival.value)departure.value=''});
 form.addEventListener('submit',e=>{e.preventDefault();for(const item of form.querySelectorAll('.field-error'))item.textContent='';const errors={};if(!selector.value)errors.property='Оберіть локацію.';if(!arrival.value)errors.arrival='Вкажіть дату заїзду.';if(!departure.value)errors.departure='Вкажіть дату виїзду.';if(arrival.value&&departure.value&&departure.value<=arrival.value)errors.departure='Дата виїзду має бути пізніше заїзду.';const contact=form.elements.contact.value.trim();if(!contact)errors.contact='Вкажіть тестовий телефон або email.';else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)||/^[+\d][\d\s()\-]{6,}$/.test(contact)))errors.contact='Перевірте формат телефону або email.';for(const [field,message] of Object.entries(errors)){const slot=form.querySelector(`[data-error="${field}"]`);if(slot)slot.textContent=message}if(Object.keys(errors).length){const firstInvalid=Object.keys(errors)[0];document.getElementById(firstInvalid)?.focus();return}const label=selector.options[selector.selectedIndex].text;const feedback=form.querySelector('[data-feedback]');feedback.innerHTML=`<strong>Це приклад відповіді для ${label}.</strong><p>Реального запиту не відправлено. Наявність, тариф і умови не перевірялися. Усі дані залишаються лише у вашому браузері та не передаються.</p>`;feedback.hidden=false;feedback.focus()});
});

