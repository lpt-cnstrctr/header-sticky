function initAccordion(event){
    console.log(event);
    var accordion = document.querySelectorAll('.accordion-title');
    accordion.forEach(function(acc){
        console.log(acc,acc.parentNode.parentNode.querySelector('.accordion-body'));
        acc.addEventListener('click',function(){
            console.log(this);
            this.parentNode.querySelector('.accordion-body').classList.toggle('expand');
        })
    })
}
document.addEventListener('DOMContentLoaded',initAccordion);
