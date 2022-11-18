let app = new Vue({ // the root Vue instance
    el: '#app', // this links to the <div> with the ID #app
    data: {
        customerName: "",
        customerPhone:0,
        outputMessage:"",
        products:products,
        iconSrc:"icon.png",
        cart: cart,
        searchList: [],
        goToCheckoutPage:false,
    },
    methods: {
        buy(product) {
            this.removeSpace(this.products, product.id);
            this.addSpace(this.cart, product.id)
        },
        removeFromCart(product) {
            this.removeSpace(this.cart, product.id);
            this.addSpace(this.products, product.id)
        },
        removeSpace(listOfProducts, productId) {
            for (let i = 0; i < listOfProducts.length; i++) {
                if (listOfProducts[i].id === productId && listOfProducts[i].spaces > 0) {
                    listOfProducts[i].spaces--;
                }
            }
        },
        addSpace(listOfProducts, productId) {
            for (let i = 0; i < listOfProducts.length; i++) {
                if (listOfProducts[i].id === productId && listOfProducts[i].spaces <= 5) {
                    listOfProducts[i].spaces++;
                }
            }
        },
        countsLessonSpacesInCart() {
            let lessonsCounter = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].spaces > 0) {
                    lessonsCounter++;
                }
            }
            return lessonsCounter;
        },
        search() {
            this.searchList = [];
            let searchString = document.getElementById("search").value;
            for (let i = 0; i < this.products.length; i++) {
                if (
                    (this.products[i].subject.toUpperCase().includes(searchString.toUpperCase()) ||
                    this.products[i].location.toUpperCase().includes(searchString.toUpperCase())&&
                    searchString.length>0
                    )) 
                    {
                        this.searchList.push(this.products[i])
                    }
            }
            if(searchString.length==0){
                this.searchList=[];
            }
        },
        outpuMessageHandler(message){
            this.outputMessage =message;
        },
        compareAlphabetical(a, b) {
            // Use toUpperCase() to ignore character casing
            const subjectA = a.subject.toUpperCase();
            const subjectB = b.subject.toUpperCase();

            let comparison = 0;
            if (subjectA > subjectB) {
                comparison = 1;
            } else if (subjectA < subjectB) {
                comparison = -1;
            }
            return comparison;
        },
        compareByCity(a, b) {
            // Use toUpperCase() to ignore character casing
            const subjectA = a.location.toUpperCase();
            const subjectB = b.location.toUpperCase();

            let comparison = 0;
            if (subjectA > subjectB) {
                comparison = 1;
            } else if (subjectA < subjectB) {
                comparison = -1;
            }
            return comparison;
        },
        sortAlphabetical() {
            this.products.sort(this.compareAlphabetical);
            this.cart.sort(this.compareAlphabetical);
        },
        sortByCity() {
            this.products.sort(this.compareByCity);
            this.cart.sort(this.compareByCity);
        },
        sortNumerical() {
            this.products.sort((a, b) => a.price - b.price);
            this.cart.sort((a, b) => a.price - b.price);
        }
    }

})