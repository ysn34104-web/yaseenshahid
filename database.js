
const firebaseConfig = {
  apiKey: "AIzaSyC1Xy9Qtdk3lHSIXgK59ZGaYdpMWeT3T_Q",
  authDomain: "yaseen-shahid.firebaseapp.com",
  projectId: "yaseen-shahid",
  storageBucket: "yaseen-shahid.firebasestorage.app",
  messagingSenderId: "891235183557",
  appId: "1:891235183557:web:256e6c05726f7e0869f9ac",
  measurementId: "G-2KH7C7483B"
};
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    // Show popup on GET STARTED button click
    document.querySelectorAll('.btn').forEach(btn => {
        if(btn.textContent.includes('GET STARTED')) {
            btn.addEventListener('click', () => {
                document.getElementById('popup-form').style.display = 'flex';
            });
        }
    });

    // Close form
    document.getElementById('close-form').addEventListener('click', () => {
        document.getElementById('popup-form').style.display = 'none';
    });

    // Submit form
    document.getElementById('lead-form').addEventListener('submit', function(e){
        e.preventDefault();
        const data = {
            name: this.name.value,
            email: this.email.value,
            mobile: this.mobile.value,
            city: this.city.value,
            province: this.province.value,
            timestamp: new Date().toISOString()
        };
        const newLeadKey = db.ref().child('leads').push().key;
        db.ref('leads/' + newLeadKey).set(data)
        .then(() => {
            this.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
        })
        .catch(err => alert("Error: " + err));
    });
