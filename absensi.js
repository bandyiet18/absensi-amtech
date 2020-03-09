function getMasukPulang(jamkerja){
    
    var awal = 5;
    var akhir = 5;
    var jamkerja = "09:28 09:33 17:01";

    var masuk = jamkerja.slice(0,awal);
    var pulang = jamkerja.slice(-akhir);

    var objkerja = {};

    objkerja.masuk = masuk;
    objkerja.pulang = pulang;

    //console.log(objkerja);
    return objkerja;
    //console.log(`Masuk : ${masuk}`);
    //console.log(`Pulang : ${pulang}`);
}

function hitungJamLembur(lembur){
    //var lembur = "01:01:00.0";
    var jamLemburJam = lembur.slice(0,2);
    var jamLemburMenit = lembur.slice(3,5);

    if(jamLemburMenit >= 45){
        return jamLembur = parseInt(jamLemburJam) + 1;
    }else{
        return parseInt(jamLemburJam);
    }
}

function waktutoms(waktu){
    var timeParts = waktu.split(":");
    return((+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000));
}

function mstowaktu(waktu) {
    //waktu = 29400000;
    var milliseconds = parseInt((waktu%1000))
        , seconds = parseInt((waktu/1000)%60)
        , minutes = parseInt((waktu/(1000*60))%60)
        , hours = parseInt((waktu/(1000*60*60))%24);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function getGaji(status,gaji, jam = 8){
    //pembagi jam = gajiharian / 8 jam
    gajiKaryawan = {};
    var haribulanan = 26;
    var harimingguan = 6; 
    if(status == "bulanan"){
        gajiperharibulanan = gaji/haribulanan;
        gajiperjambulanan = gajiperharibulanan/jam;

        gajiKaryawan.status = status;
        gajiKaryawan.gaji_per_hari = gajiperharibulanan;
        gajiKaryawan.gaji_per_jam = gajiperjambulanan;
        return gajiKaryawan;
        //console.log(gajiKaryawan);
    }else if(status == "mingguan"){
        gajiperharimingguan = gaji/harimingguan;
        gajiperjammingguan = gajiperharimingguan/jam;

        gajiKaryawan.status = status;
        gajiKaryawan.gaji_per_hari = gajiperharimingguan;
        gajiKaryawan.gaji_per_jam = gajiperjammingguan;
         gajiKaryawan;
        //console.log(gajiKaryawan);
    }
}

function getdisiplin(){
    var timekerja = getMasukPulang();

    jammasuk = "08:10";
    jampulang = "16:30";
    
    this.jammasuk = waktutoms(jammasuk);
    this.jampulang = waktutoms(jampulang);

    //console.log(jampulang);
    masuk = timekerja.masuk;
    pulang = timekerja.pulang;

    this.masuk = waktutoms(masuk);
    this.pulang = waktutoms(pulang);

    if(masuk > jammasuk){
        //dapatkan nilai timestamp dalam number, supaya mudah untuk perhitungan matematika nya
        telat = masuk - jammasuk;
        this.telat = mstowaktu(telat);
        console.log(`Telat ${telat} menit`);
    }else{
        console.log("Bagus, Pertahankan jam masukmu");
    }
}

function getLembur(hari){
    /*
        -> lembur 3 jam mendapatkan uang makan
        -> Lembur Minggu / hari besar dua kali lipat
        -> pembagi lembur 45 menit
            >= 45 menit = 1 jam
            < 45 menit = 30 menit
    */
    arrHari = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];
    objKaryawan =  {
        id : 1,
        nama : "aldita",
        status : "bulanan",
        gaji : 3500000,
        tanggal : "27/03/2020",
        masuk : "07:50",
        pulang : "18:45"
    };
    
    jampulang = "16:00";
    jamPulangSabtu = "12:00";
    jamPulangMinggu = "08:00";
    
    //var waktukerja = getMasukPulang();
    copulang = objKaryawan.pulang;

    this.jampulang = waktutoms(jampulang);
    this.copulang = waktutoms(copulang);

    if(hari == "minggu"){
        if(copulang > jamPulangMinggu){
            console.log("Minggu");
        }
    }else if(hari == "sabtu"){
        if(copulang > jamPulangSabtu){
            console.log(jamPulangSabtu);
        }
    }else{
        //console.log(jampulang);
        if(copulang > jampulang){
            var gaji = getGaji(objKaryawan.status, objKaryawan.gaji);
            console.log(gaji);
            lembur = copulang - jampulang
            this.lembur = mstowaktu(lembur);
            jamLembur = hitungJamLembur(lembur);
            var uangLembur = jamLembur * gaji.gaji_per_jam;
            console.log(`Anda Lembur ${lembur}`);
            console.log(`Gaji per jam anda ${gaji.gaji_per_jam}`);
            console.log(jamLembur);
            console.log(`Anda Mendapatkan Uang Sebesar Rp. ${uangLembur}`);
        }else if (copulang < jampulang){
            console.log(`Anda Pulang Lebih Cepat`)
        }else{
            console.log(`Anda Pulang Tepat Waktu`);
        }
    }
}
