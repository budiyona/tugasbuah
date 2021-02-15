const isitable = document.querySelector(".bodytable")
const getNama = document.querySelector('input[name="nama"]')
const getStok = document.querySelector('input[name="stok"]')
const getHarga = document.querySelector('input[name="harga"]')
const getSelect = document.querySelector('#daftarBuah')
const tombolTambah = document.querySelector('input[name="tambah"]')
const idEdit = document.querySelector('input[name="idedit"]')
const stokAmbil = document.querySelector('input[name="stok-ambil"]')


let daftarBuah = []

const tambah = () => {
    console.log("fngsi tmbah");
    let nama = getNama.value
    let stok = getStok.value
    let harga = getHarga.value

    if (nama.length > 0 && stok > 0 && harga > 0) {

        let buah = {
            nama, stok, harga
        }
        if (tombolTambah.value == 'Tambah') {
            let idxCari = daftarBuah.findIndex(el => el.nama == buah.nama)
            if (idxCari < 0) {

                daftarBuah.push(buah)
                console.log(daftarBuah);


            } else {
                alert("nama " + nama + " sudah ada")
            }
        } else {
            console.log(buah);
            console.log("Update handle");
            daftarBuah.splice(idEdit.value, 1, buah)
            getNama.disabled = false
        }
        updateOption()
        tampilkanKeTabel()
        clearForm()
    }
    else {
        alert("isi semua data")
    }


}
const updateOption = () => {
    console.log("Update option");
    let option = daftarBuah.map(el => el.nama)
    console.log(option);
    getSelect.innerHTML = ``
    option.forEach((el) => {
        getSelect.innerHTML += `
            <option > ${el}</option>
        `
    })
}
const tampilkanKeTabel = () => {
    console.log(isitable);
    console.log('tapliknas');
    isitable.innerHTML = ``

    daftarBuah.forEach((buah, i) => {
        isitable.innerHTML +=
            `
                <tr>
                    <td class="center-text">${i + 1}</td>
                    <td class="center-text">${buah.nama}</td>
                    <td class="center-text">${buah.stok}</td>
                    <td class="center-text">${buah.harga}</td>
                    <td class="center-text">
                                <button class="update-btn" type="button" onclick="updateBuah(${i})">Update</button>
                                <button class="delete-btn" type="button" onclick="deleteBuah(${i})">Delete</button>
                    </td>
                </tr>
            `
    })

}

const updateBuah = (id) => {
    console.log("tampilkan buah ke form");
    let targetUpdate = daftarBuah[id]
    getNama.value = targetUpdate.nama
    getStok.value = targetUpdate.stok
    getHarga.value = targetUpdate.harga
    console.log(getNama);
    getNama.disabled = true
    idEdit.value = id
    tombolTambah.value = "Update"
}

const deleteBuah = (id) => {
    daftarBuah.splice(id, 1)
    tampilkanKeTabel()
}

const clearForm = () => {
    getNama.value = ''
    getStok.value = null
    getHarga.value = null
}
const beli = () => {
    console.log(getSelect.value);
    let stok = parseInt(stokAmbil.value)
    let idx = daftarBuah.findIndex(el => el.nama == getSelect.value)
    console.log(stok);
    if(getSelect.value===""){
        alert("data kosong")
    }else{
        if(stok>=1){
            let stokGudang = daftarBuah[idx].stok
            if(stok> stokGudang){
                alert('Maksimal stok = '+ stokGudang)
            }else{
                daftarBuah[idx].stok -= stok
                tampilkanKeTabel()
            }
            stok=0
        }else{
            alert("periksa stok yang ingin dibeli")
        }
        
    }
}