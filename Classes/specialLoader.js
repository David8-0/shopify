class specialLoader extends HTMLElement{

    connectedCallback(){
        this.innerHTML=`
        <div class="loader-container w-100 vh-100 d-flex top-0 justify-content-center align-items-center bg-secondary bg-opacity-25  position-fixed ">
        <div class="loader "></div>
    </div>
        `;
    }
}
customElements.define('special-loader',specialLoader);