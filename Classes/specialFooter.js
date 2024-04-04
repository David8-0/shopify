
class specialFooter extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<div id="footer-container">     
        <h3 class="text-center bg-danger">footer</h3>
    </div>
    `;
    }
}
customElements.define('special-footer',specialFooter);