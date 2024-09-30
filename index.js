// Smooth scrolling for the "Explore Features" button
document.querySelector('.btn-light a').addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
});

// Scroll to Top functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Show the button when the user scrolls down 20px from the top of the document
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
};

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll
    });
}




// FAQ Drop Down animation
document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.parentElement.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});




// Initialize the map and set the view to a central point in India
const map = L.map("map").setView([20.5937, 78.9629], 5);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Function to determine marker color based on water level
function getMarkerColor(waterLevel) {
  if (waterLevel > 40) return "#0000FF"; // Dark Blue
  if (waterLevel > 30) return "#4169E1"; // Royal Blue
  if (waterLevel > 20) return "#00BFFF"; // Deep Sky Blue
  if (waterLevel > 15) return "#00FF00"; // Green
  if (waterLevel > 10) return "#FFFF00"; // Yellow
  if (waterLevel > 5) return "#FFA500"; // Orange
  return "#FF0000"; // Red
}


// Function to get water level description
function getWaterLevelDescription(waterLevel) {
  if (waterLevel > 40) return "Very High";
  if (waterLevel > 30) return "High";
  if (waterLevel > 20) return "Above Average";
  if (waterLevel > 15) return "Average";
  if (waterLevel > 10) return "Below Average";
  if (waterLevel > 5) return "Low";
  return "Very Low";
}

// Load and parse the CSV file using PapaParse
Papa.parse("data.csv", {
  download: true,
  header: true,
  dynamicTyping: true, // Automatically convert numeric strings to numbers
  complete: function (results) {
    results.data.forEach(function (row) {
      const lat = row.latitude;
      const lon = row.longitude;
      const waterLevel = row.water_level;

      if (
        typeof lat === "number" &&
        typeof lon === "number" &&
        !isNaN(lat) &&
        !isNaN(lon) &&
        typeof waterLevel === "number"
      ) {
        // Determine marker color based on water level
        const markerColor = getMarkerColor(waterLevel);

        // Create a circle marker
        const marker = L.circleMarker([lat, lon], {
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.7,
          radius: 0.6,
        }).addTo(map);

        // Get water level description
        const waterLevelDesc = getWaterLevelDescription(waterLevel);

        // Bind popup to show water level information on click or hover
        marker.bindPopup(`
                    <strong>Location:</strong> ${lat.toFixed(4)}, ${lon.toFixed(
          4
        )}<br>
                    <strong>Water Level:</strong> ${waterLevel.toFixed(2)} m<br>
                    <strong>Status:</strong> ${waterLevelDesc}
                `);
      }
    });

    // Fit the map to the bounds of all markers
    const group = new L.featureGroup(map._layers);
    map.fitBounds(group.getBounds());
  },
  error: function (error) {
    console.error("Error parsing CSV:", error);
  },
});

/* Search bar functionality */
const stateCoordinates = {
  "Andhra Pradesh": {
    coordinates: [15.9129, 79.74],
    districts: {
      Anantapur: [14.6852, 77.598],
      Chittoor: [13.2107, 79.1162],
      "East Godavari": [16.3052, 81.7757],
      Guntur: [16.3064, 80.4397],
      Krishna: [16.19, 81.4428],
      Kurnool: [15.8271, 78.0389],
      Nellore: [14.442, 79.9868],
      Prakasam: [15.8498, 80.0598],
      Srikakulam: [18.2959, 83.8993],
      Visakhapatnam: [17.6868, 83.2185],
      Vizianagaram: [18.1034, 83.4012],
      "West Godavari": [16.7569, 81.2032],
      "Y.S.R. Kadapa": [14.467, 78.8151],
    },
  },
  "Arunachal Pradesh": {
    coordinates: [28.218, 94.7278],
    districts: {
      Aalo: [28.1862, 94.8027],
      Itanagar: [27.1025, 93.7093],
      Tawang: [27.5118, 91.802],
      "West Kameng": [27.061, 92.7187],
      "Lower Subansiri": [27.1134, 93.8676],
      "Papum Pare": [27.1276, 93.7901],
      "Upper Siang": [28.0331, 94.8018],
      "West Siang": [28.0555, 94.3706],
      "Shi Yomi": [29.0837, 94.614],
      "Lepa Rada": [28.1137, 94.1824],
    },
  },
  Assam: {
    coordinates: [26.2006, 92.9376],
    districts: {
      Baksa: [26.2571, 91.335],
      Barpeta: [26.3252, 90.4295],
      Bongaigaon: [26.4692, 90.5589],
      Darrang: [26.3175, 92.4421],
      Dibrugarh: [27.4856, 94.905],
      Gauhati: [26.1445, 91.7363],
      Golaghat: [26.4702, 93.951],
      Jorhat: [26.7473, 94.2173],
      Karimganj: [24.872, 92.4713],
      Kokrajhar: [26.3147, 90.2714],
      Nagaon: [26.2794, 92.5256],
      Tinsukia: [27.4934, 95.3698],
      Sonitpur: [26.772, 92.84],
      Dhemaji: [27.4765, 94.4592],
      Udalguri: [26.4716, 92.1106],
      Morigaon: [26.3, 92.4837],
    },
  },
  Bihar: {
    coordinates: [25.0961, 85.3131],
    districts: {
      Araria: [26.1836, 87.892],
      Aurangabad: [24.7985, 84.3666],
      Banka: [24.8951, 86.9722],
      Begusarai: [25.4184, 86.1371],
      Bhagalpur: [25.2436, 87.1475],
      "Bihar Sharif": [25.197, 85.5095],
      Gaya: [24.7955, 85.999],
      Jamui: [24.9757, 85.8797],
      Jehanabad: [25.2, 85.2045],
      Kaimur: [25.04, 83.6364],
      Katihar: [25.531, 87.5814],
      Khagaria: [25.427, 86.0981],
      Madhepura: [25.8723, 87.3035],
      Madhubani: [26.349, 86.114],
      Munger: [25.3732, 86.4618],
      Nalanda: [25.26, 85.5466],
      Nawada: [24.8995, 85.8334],
      Purnia: [25.7741, 87.4995],
      Rohtas: [24.5648, 84.0914],
      Saharsa: [25.8905, 86.6097],
      Samastipur: [25.8596, 85.791],
      Saran: [26.0524, 84.586],
      Sitamarhi: [26.5925, 85.5637],
      Siwan: [26.2221, 84.3581],
      Vaishali: [25.6796, 85.2572],
      "West Champaran": [27.1455, 84.4202],
    },
  },
  Chhattisgarh: {
    coordinates: [21.2787, 81.8661],
    districts: {
      Balod: [20.5633, 81.3664],
      "Baloda Bazar": [21.399, 82.0214],
      Bastar: [19.1924, 81.7455],
      Bijapur: [18.8411, 81.9942],
      Bilaspur: [22.0999, 82.1497],
      Dantewada: [19.1542, 81.6895],
      Dhamtari: [20.5782, 81.5737],
      Durg: [20.6487, 81.2955],
      JanJGanj: [21.6591, 81.2431],
      Korba: [22.3803, 82.6818],
      Koriya: [23.2577, 82.6631],
      Mahasamund: [21.0793, 82.0305],
      Rajnandgaon: [21.1075, 81.0319],
      Sukma: [18.6773, 81.6377],
      Surguja: [23.6902, 82.8071],
    },
  },
  Goa: {
    coordinates: [15.2993, 74.124],
    districts: {
      "North Goa": [15.6693, 74.1173],
      "South Goa": [15.2272, 74.0553],
    },
  },
  Gujarat: {
    coordinates: [22.2587, 71.1924],
    districts: {
      Ahmedabad: [23.0225, 72.5714],
      Amreli: [21.5934, 84.2925],
      Anand: [22.5726, 72.9738],
      Aravalli: [23.237, 73.4903],
      Banaskantha: [24.2347, 72.5366],
      Bharuch: [21.697, 72.6328],
      Bhavnagar: [21.751, 72.1504],
      Dahod: [22.9716, 74.1408],
      Dangs: [20.5826, 73.7312],
      Gandhinagar: [23.2156, 72.6369],
      Kutch: [23.8796, 68.186],
      Kheda: [22.7036, 72.832],
      Mahisagar: [23.2676, 72.9083],
      Mehsana: [23.6004, 72.4002],
      Narmada: [21.6736, 73.3641],
      Navsari: [20.958, 72.9273],
      Panchmahal: [22.4054, 73.6923],
      Patan: [23.85, 72.2092],
      Porbandar: [21.6408, 69.5952],
      Rajkot: [22.3039, 70.7359],
      Sabarkantha: [23.2777, 72.7128],
      Surat: [21.1702, 72.8311],
      Surendranagar: [22.7132, 71.6395],
      Vadodara: [22.3072, 73.1812],
      Valsad: [20.3921, 72.9288],
    },
  },
  Haryana: {
    coordinates: [29.0588, 76.0856],
    districts: {
      Ambala: [30.378, 76.7733],
      Bhiwani: [28.7856, 75.6073],
      "Charkhi Dadri": [28.6171, 76.496],
      Faridabad: [28.4082, 77.3164],
      Fatehabad: [29.0357, 75.5862],
      Gurugram: [28.4595, 77.0266],
      Hisar: [29.1498, 75.7242],
      Jhajjar: [28.591, 76.6406],
      Jind: [29.3141, 76.2937],
      Kaithal: [29.8377, 76.3874],
      Karnal: [29.6857, 76.9896],
      Kurukshetra: [29.9457, 76.8115],
      Mahendragarh: [28.3926, 76.9747],
      Panchkula: [30.6957, 76.8502],
      Panipat: [29.3903, 76.9671],
      Rewari: [28.197, 76.6206],
      Rohtak: [28.8936, 76.6104],
      Sirsa: [29.5359, 75.0264],
      Sonipat: [28.9965, 77.0145],
      Yamunanagar: [30.0535, 77.2719],
    },
  },
  "Himachal Pradesh": {
    coordinates: [31.1048, 77.1734],
    districts: {
      Bilaspur: [31.3911, 76.755],
      Chamba: [32.5525, 76.1345],
      Hamirpur: [31.4546, 76.5205],
      Kinnaur: [31.377, 78.476],
      Kullu: [31.9184, 77.1049],
      "Lahaul and Spiti": [32.2472, 77.08],
      Mandi: [31.7032, 76.9326],
      Shimla: [31.1048, 77.1734],
      Sirmaur: [30.5884, 77.2657],
      Solan: [30.9105, 77.0713],
      Una: [31.3322, 76.5347],
    },
  },
  "Jammu and Kashmir": {
    coordinates: [33.7782, 76.5762],
    districts: {
      Jammu: [32.7266, 74.8572],
      Kathua: [32.39, 75.538],
      Kishtwar: [33.0594, 75.7515],
      Rajouri: [33.3718, 74.3202],
      Ramban: [33.2313, 75.2518],
      Reasi: [33.1745, 75.5308],
      Samba: [32.62, 75.0773],
      Udhampur: [32.9261, 75.3386],
      Anantnag: [33.7276, 75.1549],
      Bandipora: [34.4195, 74.6588],
      Baramulla: [34.1778, 74.3658],
      Budgam: [34.0227, 74.7182],
      Doda: [33.2023, 75.684],
      Ganderbal: [34.0223, 75.3498],
      Kulgam: [33.6776, 75.0672],
      Pulwama: [33.8671, 75.0963],
      Shopian: [33.6841, 75.1098],
    },
  },
  Jharkhand: {
    coordinates: [23.6102, 85.2799],
    districts: {
      Bokaro: [23.7632, 86.151],
      Chatra: [24.0114, 84.8827],
      Deoghar: [24.4742, 86.6964],
      Dhanbad: [23.8008, 86.4304],
      Dumka: [24.2005, 87.2465],
      "East Singhbhum": [22.8046, 86.1958],
      Garhwa: [24.1178, 83.4711],
      Giridih: [24.1942, 86.3292],
      Godda: [24.8265, 87.3062],
      Gumla: [23.2272, 84.5652],
      Hazaribagh: [23.9962, 85.3601],
      Jamtara: [23.9911, 86.9834],
      Khunti: [23.0372, 85.2795],
      Koderma: [24.4386, 85.743],
      Latehar: [23.6717, 84.7937],
      Lohardaga: [23.236, 85.979],
      Pakur: [24.327, 87.9158],
      Palamu: [24.695, 84.1751],
      Ranchi: [23.3441, 85.3094],
      Sahibganj: [25.2007, 87.6345],
      "Saraikela Kharsawan": [22.7335, 86.1515],
      Simdega: [22.68, 84.768],
      "West Singhbhum": [22.3, 85.8285],
    },
  },
  Karnataka: {
    coordinates: [15.3173, 75.7139],
    districts: {
      Bagalkote: [16.1819, 75.623],
      Ballari: [15.139, 75.0065],
      "Bangalore Rural": [13.0287, 77.1688],
      "Bangalore Urban": [12.9716, 77.5946],
      Belagavi: [15.8489, 74.498],
      Bellary: [15.139, 75.0065],
      Bidar: [17.9134, 77.5265],
      Chamarajanagar: [11.9998, 76.991],
      Chikkaballapur: [13.4415, 77.7314],
      Chikkamagaluru: [13.3133, 75.7756],
      Davanagere: [14.4641, 75.9214],
      Dharwad: [15.4547, 75.011],
      Gadag: [15.4096, 75.645],
      Hassan: [13.0088, 76.195],
      Haveri: [14.8144, 75.3584],
      Kodagu: [12.3297, 75.7731],
      Kolar: [13.1393, 78.1044],
      Koppal: [15.3602, 76.1603],
      Mandya: [12.5258, 76.9],
      Mysuru: [12.2958, 76.6392],
      Raichur: [16.205, 77.3592],
      Ramanagara: [12.5606, 77.209],
      Shivamogga: [13.93, 75.5604],
      Tumakuru: [13.3391, 77.1013],
      Udupi: [13.341, 74.7495],
      "Uttara Kannada": [14.3174, 74.3252],
      Vijayapura: [16.8299, 75.7063],
      Yadgir: [16.1932, 77.1497],
    },
  },
  Kerala: {
    coordinates: [10.8505, 76.2711],
    districts: {
      Alappuzha: [9.4981, 76.3412],
      Ernakulam: [9.9816, 76.3014],
      Idukki: [9.9743, 77.0595],
      Kannur: [11.8823, 75.3463],
      Kasaragod: [12.4896, 74.9527],
      Kollam: [8.8832, 76.614],
      Kottayam: [9.5916, 76.5225],
      Malappuram: [11.1163, 76.0803],
      Palakkad: [10.7863, 76.6542],
      Pathanamthitta: [9.2729, 76.646],
      Thiruvananthapuram: [8.5241, 76.9369],
      Thrissur: [10.5276, 76.2144],
      Wayanad: [11.7519, 75.7246],
      Alappuzha: [9.4981, 76.3412],
      Ernakulam: [9.9816, 76.3014],
      Idukki: [9.9743, 77.0595],
      Kannur: [11.8823, 75.3463],
      Kasaragod: [12.4896, 74.9527],
      Kollam: [8.8832, 76.614],
      Kottayam: [9.5916, 76.5225],
      Malappuram: [11.1163, 76.0803],
      Palakkad: [10.7863, 76.6542],
      Pathanamthitta: [9.2729, 76.646],
      Thiruvananthapuram: [8.5241, 76.9369],
      Thrissur: [10.5276, 76.2144],
      Wayanad: [11.7519, 75.7246],
    },
  },
  "Madhya Pradesh": {
    coordinates: [22.9734, 78.6569],
    districts: {
      "Agar Malwa": [23.3862, 76.8912],
      Alirajpur: [22.0962, 74.2908],
      Anuppur: [32.8781, 81.9654],
      Ashoknagar: [24.2221, 78.1986],
      Balaghat: [21.8921, 80.2678],
      Barwani: [22.0255, 75.7851],
      Betul: [21.8978, 77.8116],
      Bhind: [26.5738, 78.3685],
      Bhopal: [23.2599, 77.4126],
      Burhanpur: [21.2964, 76.2284],
      Chhindwara: [22.0607, 78.8792],
      Damoh: [23.9491, 79.4226],
      Datia: [25.8451, 78.8103],
      Dewas: [22.3228, 76.7884],
      Dhar: [22.5361, 75.6604],
      Guna: [24.6498, 77.3142],
      Harda: [22.4475, 77.0302],
      Hoshangabad: [22.7453, 77.1989],
      Indore: [22.7197, 75.8573],
      Jabalpur: [23.1815, 79.95],
      Jhabua: [22.7035, 74.4764],
      Katni: [23.8203, 80.3924],
      Khandwa: [21.7955, 76.3],
      Khargone: [22.2004, 75.0322],
      Mandla: [22.3784, 80.7062],
      Mandsaur: [24.0667, 75.2205],
      Morena: [26.5139, 78.1202],
      Narsinghpur: [22.8784, 78.7044],
      Neemuch: [24.573, 75.7739],
      Panna: [24.2394, 80.1462],
      Raisen: [23.254, 78.6184],
      Rajgarh: [24.1752, 76.0328],
      Ratlam: [23.343, 75.1018],
      Rewa: [24.5857, 81.2977],
      Sagar: [23.8355, 78.7384],
      Satna: [24.6483, 80.803],
      Sehore: [23.1235, 77.1356],
      Shahdol: [23.5296, 81.3475],
      Shajapur: [23.5145, 76.7603],
      Sidhi: [23.8925, 81.8598],
      Singrauli: [24.0089, 82.614],
      Tikamgarh: [24.7307, 78.8756],
      Ujjain: [23.1799, 75.7889],
      Umaria: [24.575, 81.3343],
      Vidisha: [23.4871, 78.8208],
    },
  },
  Maharashtra: {
    coordinates: [19.6633, 75.3003],
    districts: {
      Ahmednagar: [19.0984, 74.738],
      Akola: [20.7046, 76.1845],
      Amravati: [20.9371, 77.278],
      Aurangabad: [19.8762, 75.3412],
      Beed: [19.6406, 75.6167],
      Bhandara: [21.1642, 79.7634],
      Buldhana: [20.5078, 76.1947],
      Chandrapur: [19.9494, 79.2985],
      Dhule: [20.9081, 74.7736],
      Gadchiroli: [20.0575, 80.0079],
      Gondia: [21.4523, 80.1985],
      Hingoli: [19.7102, 77.2282],
      Jalna: [19.8401, 75.8892],
      Jalgaon: [20.9894, 75.5602],
      Kolhapur: [16.705, 74.2434],
      Latur: [18.406, 76.8502],
      Mumbai: [19.076, 72.8777],
      Nagpur: [21.1458, 79.0882],
      Nanded: [19.1405, 77.251],
      Nasik: [19.9975, 73.7876],
      Osmanabad: [18.4093, 76.0182],
      Parbhani: [19.2675, 76.776],
      Pune: [18.5196, 73.8553],
      Ratnagiri: [16.9949, 73.247],
      Sindhudurg: [16.066, 73.504],
      Solapur: [17.6575, 75.9064],
      Thane: [19.2183, 72.9781],
      Wardha: [20.7544, 78.6565],
      Washim: [20.4717, 77.2405],
      Yavatmal: [20.3851, 78.8093],
    },
  },
  Manipur: {
    coordinates: [24.6637, 93.9063],
    districts: {
      Bishnupur: [24.4644, 93.9583],
      Chandel: [24.6751, 93.828],
      Churachandpur: [24.2968, 93.5868],
      "Imphal East": [24.8085, 93.9364],
      "Imphal West": [24.8217, 93.9106],
      Jiribam: [24.751, 93.218],
      Kakching: [24.6434, 93.434],
      Kamjong: [25.3455, 94.1681],
      Noney: [25.4677, 93.5508],
      Pherzawl: [25.2913, 93.544],
      Senapati: [24.6085, 93.7132],
      Tamenglong: [24.5492, 93.5902],
      Thoubal: [24.6678, 93.9497],
      Ukhrul: [25.1331, 94.2543],
    },
  },
  Meghalaya: {
    coordinates: [25.467, 91.3662],
    districts: {
      "East Garo Hills": [25.4538, 90.6537],
      "East Khasi Hills": [25.466, 91.585],
      "North Garo Hills": [25.475, 90.3248],
      "Ri Bhoi": [25.5807, 91.5994],
      "South Garo Hills": [25.4522, 90.5056],
      "South West Garo Hills": [25.4113, 90.0251],
      "West Garo Hills": [25.4773, 90.5724],
      "West Khasi Hills": [25.5803, 91.3662],
    },
  },
  Mizoram: {
    coordinates: [23.1645, 92.9376],
    districts: {
      Aizawl: [23.1645, 92.9376],
      Champhai: [23.063, 93.3138],
      Khawzawl: [23.0591, 92.9123],
      Kolasib: [23.1393, 92.7465],
      Lawngtlai: [22.8506, 92.7385],
      Lunglei: [22.8862, 92.7304],
      Saiha: [22.3728, 92.7268],
      Serchhip: [23.2558, 92.7195],
    },
  },
  Nagaland: {
    coordinates: [26.1584, 94.5624],
    districts: {
      Dimapur: [25.9986, 93.721],
      Kiphire: [26.1228, 94.3218],
      Longleng: [26.029, 94.5076],
      Mokokchung: [26.1282, 94.4998],
      Mon: [26.9425, 94.2186],
      Peren: [26.2503, 93.748],
      Phek: [25.9003, 93.6813],
      Tuensang: [26.1938, 94.5763],
      Wokha: [26.0782, 94.252],
      Zunheboto: [26.0762, 94.2456],
    },
  },
  Odisha: {
    coordinates: [20.9517, 85.0985],
    districts: {
      Angul: [20.1971, 85.0431],
      Bargarh: [21.1125, 83.3254],
      Boudh: [20.7241, 83.1982],
      Cuttack: [20.4625, 85.8828],
      Deogarh: [21.3066, 84.8021],
      Dhenkanal: [20.2432, 85.6577],
      Ganjam: [19.36, 84.671],
      Ganjam: [19.36, 84.671],
      Jagatsinghpur: [20.2754, 86.2121],
      Jajpur: [20.5026, 86.3561],
      Kalahandi: [19.9238, 83.1962],
      Kandhamal: [20.4808, 85.1292],
      Kendrapara: [20.3676, 86.4202],
      Keonjhar: [21.6746, 85.4262],
      Khurda: [20.1935, 85.8322],
      Koraput: [18.8276, 82.7445],
      Mayurbhanj: [21.8138, 86.8682],
      Nabarangpur: [19.8796, 82.5906],
      Nuapada: [19.863, 82.7162],
      Puri: [19.8135, 85.8312],
      Rayagada: [19.1516, 83.9493],
      Sambalpur: [21.4662, 83.942],
      Subarnapur: [20.8441, 83.9311],
      Sundargarh: [22.2319, 83.3307],
    },
  },
  Punjab: {
    coordinates: [30.7333, 76.7794],
    districts: {
      Amritsar: [31.634, 74.8723],
      Barnala: [30.3605, 75.623],
      Bathinda: [30.2101, 74.9486],
      "Fatehgarh Sahib": [30.608, 76.203],
      Ferozepur: [30.9254, 74.6173],
      Gurdaspur: [32.0261, 75.3587],
      Hoshiarpur: [31.5345, 75.9606],
      Jalandhar: [31.326, 75.5793],
      Kapurthala: [31.3632, 75.3926],
      Ludhiana: [30.9009, 75.8573],
      Mansa: [29.9921, 75.2167],
      Mohali: [30.7046, 76.7179],
      Pathankot: [32.2751, 75.6545],
      Rupnagar: [30.9765, 76.6472],
      Sangrur: [30.4004, 75.8509],
      "SAS Nagar": [30.7046, 76.7179],
      "Shaheed Bhagat Singh Nagar": [31.0272, 76.0965],
      "Tarn Taran": [31.4957, 75.3672],
    },
  },
  Rajasthan: {
    coordinates: [27.0238, 74.2176],
    districts: {
      Ajmer: [26.4534, 74.6399],
      Alwar: [27.333, 76.6372],
      Banswara: [23.2874, 74.4485],
      Baran: [25.0844, 76.5642],
      Barmer: [25.2586, 70.0477],
      Bikaner: [28.0155, 73.312],
      Chittorgarh: [24.879, 74.6328],
      Dausa: [26.9273, 76.8182],
      Dungarpur: [23.8466, 73.7144],
      Hanumangarh: [29.046, 74.3107],
      Jaipur: [26.9124, 75.7873],
      Jaisalmer: [26.9157, 70.9119],
      Jalore: [25.0854, 70.6324],
      Jhunjhunu: [28.1125, 75.3792],
      Jodhpur: [26.2389, 73.0243],
      Kota: [25.2138, 75.8648],
      Nagaur: [27.1882, 73.7148],
      Pali: [25.7666, 73.3291],
      Rajsamand: [25.0573, 73.8488],
      "Sawai Madhopur": [26.0016, 76.3662],
      Sikar: [27.4878, 75.1394],
      Tonk: [26.173, 75.5861],
      Udaipur: [24.5714, 73.6828],
    },
  },
  Sikkim: {
    coordinates: [27.533, 88.5122],
    districts: {
      "East Sikkim": [27.3958, 88.6109],
      "North Sikkim": [28.305, 88.6198],
      "South Sikkim": [27.2389, 88.6292],
      "West Sikkim": [27.1586, 88.6106],
    },
  },
  "Tamil Nadu": {
    coordinates: [11.1271, 78.6569],
    districts: {
      Chennai: [13.0827, 80.2707],
      Coimbatore: [11.0168, 76.9558],
      Cuddalore: [11.7401, 79.4683],
      Dharmapuri: [12.0902, 78.1757],
      Dindigul: [10.3642, 77.9743],
      Erode: [11.3415, 77.7111],
      Kancheepuram: [12.8378, 79.7055],
      Kanyakumari: [8.0881, 77.5709],
      Karur: [10.9466, 78.0733],
      Madurai: [9.925, 78.1194],
      Nagapattinam: [10.7657, 79.8414],
      Namakkal: [11.1976, 78.1555],
      Perambalur: [11.2243, 78.7388],
      Pudukkottai: [10.391, 78.7866],
      Ramanathapuram: [9.3513, 78.6816],
      Salem: [11.6643, 78.1439],
      Sivagangai: [9.8614, 78.5164],
      Thanjavur: [10.7905, 79.1398],
      Thoothukudi: [8.8001, 78.1347],
      Tiruchirappalli: [10.7905, 78.7047],
      Tirunelveli: [8.65, 77.9989],
      Vellore: [12.9165, 79.1324],
      Viluppuram: [11.9308, 79.3865],
      Virudhunagar: [9.518, 78.8885],
    },
  },
  Telangana: {
    coordinates: [17.385, 78.4867],
    districts: {
      Adilabad: [19.6644, 78.8036],
      Hyderabad: [17.385, 78.4867],
      Jagtial: [17.711, 78.9515],
      Jangaon: [17.6742, 79.3567],
      Khammam: [17.247, 80.1515],
      Mahabubnagar: [16.5303, 77.9936],
      Mancherial: [19.1805, 79.422],
      Medak: [17.7065, 78.2583],
      "Medchal-Malkajgiri": [17.4812, 78.5387],
      Nalgonda: [17.0504, 79.2686],
      Nizamabad: [18.6736, 78.6492],
      Peddapalli: [17.8042, 80.1952],
      "Ranga Reddy": [17.2312, 78.5162],
      Sangareddy: [17.6638, 78.5406],
      Siddipet: [17.1593, 78.0456],
      Vikarabad: [17.6097, 77.8974],
      Wanaparthy: [16.7078, 77.62],
      "Yadadri Bhuvanagiri": [17.6499, 78.8972],
    },
  },
  Tripura: {
    coordinates: [23.9408, 91.9882],
    districts: {
      Dhalai: [23.9696, 91.6584],
      Gomati: [23.6407, 91.7264],
      Khowai: [23.9724, 91.8854],
      "North Tripura": [24.0563, 92.2055],
      Sepahijala: [23.5462, 91.537],
      "South Tripura": [23.6072, 91.7246],
      Unakoti: [24.0841, 92.0213],
      "West Tripura": [23.7625, 91.2907],
    },
  },
  Delhi: {
    coordinates: [28.7041, 77.1025],
    districts: {
      "Central Delhi": [28.6619, 77.2167],
      "East Delhi": [28.6373, 77.283],
      "New Delhi": [28.6139, 77.209],
      "North Delhi": [28.7217, 77.127],
      "North East Delhi": [28.7509, 77.266],
      "North West Delhi": [28.7041, 77.1025],
      Shahdara: [28.6896, 77.2893],
      "South Delhi": [28.481, 77.1873],
      "South East Delhi": [28.5244, 77.258],
      "South West Delhi": [28.5276, 76.9938],
      "West Delhi": [28.6467, 77.0887],
    },
  },
  "Jammu and Kashmir": {
    coordinates: [33.7782, 76.5762],
    districts: {
      Anantnag: [33.7307, 75.1544],
      Bandipora: [34.5046, 74.6869],
      Baramulla: [34.1986, 74.3636],
      Budgam: [34.0151, 74.7169],
      Doda: [33.1484, 75.5474],
      Ganderbal: [34.2165, 74.7749],
      Jammu: [32.7266, 74.857],
      Kathua: [32.3707, 75.5175],
      Kulgam: [33.6443, 75.018],
      Kupwara: [34.5314, 74.2645],
      Poonch: [33.7697, 74.0937],
      Pulwama: [33.8742, 74.8996],
      Rajouri: [33.3757, 74.3151],
      Ramban: [33.2357, 75.239],
      Reasi: [33.0807, 74.8351],
      Samba: [32.562, 75.124],
      Shopian: [33.717, 74.8317],
      Srinagar: [34.0837, 74.7973],
      Udhampur: [32.9304, 75.1363],
    },
  },
  Ladakh: {
    coordinates: [34.2268, 77.5619],
    districts: {
      Kargil: [34.5553, 76.1351],
      Leh: [34.1642, 77.5848],
    },
  },
  "Uttar Pradesh": {
    coordinates: [26.8467, 80.9462],
    districts: {
      Agra: [27.1767, 78.0081],
      Aligarh: [27.8974, 78.0882],
      Allahabad: [25.4358, 81.8463],
      "Ambedkar Nagar": [26.4631, 82.4704],
      Amethi: [26.5142, 81.5513],
      Amroha: [28.9019, 78.4737],
      Auraiya: [26.7417, 79.5984],
      Badaun: [28.0344, 79.5309],
      Baghpat: [28.2594, 77.1983],
      Bahraich: [27.367, 81.6232],
      Balrampur: [27.1939, 81.9597],
      Banda: [25.4202, 80.1166],
      Barabanki: [26.9581, 81.185],
      Bareilly: [28.367, 79.442],
      Bijnor: [29.373, 78.1752],
      Budaun: [28.0354, 79.5306],
      Bulandshahr: [28.4024, 77.853],
      Chandauli: [25.1315, 83.2072],
      "Chhatrapati Shahuji Maharaj Nagar": [26.1166, 80.6157],
      Chitrakoot: [25.1991, 80.8829],
      Deoria: [26.509, 83.7843],
      Etah: [27.4647, 78.6283],
      Etawah: [26.7801, 79.0736],
      Farrukhabad: [27.4185, 79.6343],
      Fatehpur: [25.9639, 80.7544],
      Firozabad: [27.1582, 78.3961],
      "Gautam Buddh Nagar": [28.5705, 77.7085],
      Ghaziabad: [28.6692, 77.4534],
      Ghazipur: [25.5798, 83.5784],
      Gonda: [27.1306, 81.9644],
      Hamirpur: [25.9524, 80.6807],
      Hapur: [28.7331, 77.7637],
      Hardoi: [27.3299, 80.1185],
      Hathras: [27.585, 78.0521],
      Jalaun: [26.1034, 79.3953],
      Jaunpur: [25.7184, 82.6818],
      Jhansi: [25.448, 78.5693],
      Kannauj: [27.0372, 79.926],
      "Kanpur Dehat": [26.4473, 79.9707],
      "Kanpur Nagar": [26.4473, 80.3469],
      "Kanshiram Nagar": [27.7406, 78.8253],
      Kasganj: [27.7498, 78.9057],
      Kushinagar: [26.1546, 83.4112],
      "Lakhimpur Kheri": [27.9837, 80.793],
      Lalitpur: [25.688, 78.397],
      Lucknow: [26.8467, 80.9462],
      Maharajganj: [26.9693, 83.393],
      Mahoba: [25.2947, 79.8885],
      Mainpuri: [27.3346, 79.0302],
      Mathura: [27.4919, 77.6734],
      Mau: [26.1263, 83.551],
      Muzaffarnagar: [29.4594, 77.7086],
      "Panchsheel Nagar": [27.2373, 78.9424],
      Pilibhit: [28.6355, 79.7997],
      Pratapgarh: [25.8855, 81.249],
      Raebareli: [26.2021, 81.2463],
      Rampur: [28.7755, 79.0077],
      Saharanpur: [29.6902, 77.5507],
      "Sant Ravidas Nagar": [25.5737, 82.6163],
      Shahjahanpur: [27.561, 79.9174],
      Shamli: [29.4323, 77.3076],
      "Siddharth Nagar": [27.1283, 83.0587],
      Sitapur: [27.6349, 80.6885],
      Sonbhadra: [24.653, 82.7222],
      Sultanpur: [26.2552, 82.0665],
      Unnao: [26.4584, 80.5416],
      Varanasi: [25.3176, 82.9739],
      Voyage: [26.8492, 80.9487],
    },
  },
  Uttarakhand: {
    coordinates: [30.3165, 78.0322],
    districts: {
      Almora: [29.5988, 79.6506],
      Bageshwar: [30.0517, 80.2217],
      Champawat: [29.089, 80.0992],
      Dehradun: [30.3165, 78.0322],
      Haridwar: [29.9457, 78.1642],
      Nainital: [29.3802, 79.4542],
      "Pauri Garhwal": [30.1284, 78.894],
      Pithoragarh: [29.5835, 80.0997],
      Rudraprayag: [30.3918, 78.9226],
      "Tehri Garhwal": [30.4335, 78.3915],
      Uttarkashi: [30.7271, 78.445],
    },
  },
  "West Bengal": {
    coordinates: [22.9868, 87.855],
    districts: {
      Alipurduar: [26.4786, 89.5379],
      Bankura: [23.1347, 86.8871],
      Birbhum: [23.765, 87.6101],
      Burdwan: [23.0258, 87.9989],
      "Cooch Behar": [26.2918, 89.4496],
      "Dakshin Dinajpur": [26.6531, 88.6692],
      Darjeeling: [27.0369, 88.2622],
      Hooghly: [22.5822, 88.4379],
      Howrah: [22.585, 88.2639],
      Jalpaiguri: [26.5083, 88.7299],
      Jhargram: [22.5441, 86.9848],
      Kalimpong: [27.0676, 88.7029],
      "Koch Bihar": [26.2918, 89.4496],
      Malda: [25.2408, 88.2542],
      Murshidabad: [24.2087, 88.3466],
      Nadia: [23.1932, 88.4308],
      "North 24 Parganas": [22.6701, 88.41],
      "Paschim Bardhaman": [23.324, 87.2552],
      "Purba Bardhaman": [23.0258, 87.9989],
      Purulia: [23.3587, 86.3476],
      "South 24 Parganas": [22.1638, 88.7128],
      "West Midnapore": [22.5622, 87.83],
    },
  },
};
// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// Zoom to state or district on search
document.getElementById("searchBar").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const input = e.target.value.trim();
    let found = false;

    // Search for state
    if (stateCoordinates[input]) {
      map.setView(stateCoordinates[input], 7); // Zoom level for state
      found = true;
    } else {
      // Search for district
      for (const state in stateCoordinates) {
        const districts = stateCoordinates[state].districts;
        if (districts && districts[input]) {
          map.setView(districts[input], 10); // Zoom level for district
          found = true;
          break;
        }
      }
    }

    if (!found) {
      alert("State or district not found. Please try again.");
    }
  }
});
