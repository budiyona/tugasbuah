import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daftarbuah: [],
      stokBeli: 0,
      namaBeli: "",
      namaBuah: "",
      stokBuah: 0,
      hargaBuah: 0,
      initId: 0,
      updateStatus: false
    }
  }

  setValue = (el) => {
    this.setState({
      [el.target.name]: el.target.value
    })


  }
  tambah = () => {
    console.log(this.state);
    let obj = {
      idBuah: this.state.initId + 1,
      namaBuah: this.state.namaBuah,
      stokBuah: parseInt(this.state.stokBuah),
      hargaBuah: parseInt(this.state.hargaBuah)
    }
    let tmp = this.state.daftarbuah
    tmp.push(obj)
    this.setState({
      daftarbuah: tmp,
      initId: this.state.initId + 1
    })
    console.log("obj", obj);
    console.log("daftarBuah", this.state.daftarbuah);
  }
  validation = () => {

  }
  updateBuah = (id) => {
    this.setState({
      updateStatus: true
    })
  }
  deleteBuah = (id) => {
    console.log("delete id", id);
    let tmp = this.state.daftarbuah.filter(el => el.idBuah !== id)
    this.setState({
      daftarbuah: tmp
    })
  }
  findBuahbyId = (id) => {
    let tmp = this.state.daftarbuah
    let idtarget = tmp.findIndex(el => el.idBuah === id)
    return idtarget
  }
  render() {
    let dataTable = this.state.daftarbuah.map((el, key) => {
      return (
        <tr key={key}>
          <td>{key + 1}</td>
          <td >{el.namaBuah}</td>
          <td>{el.stokBuah}</td>
          <td>{el.hargaBuah}</td>
          <td>
            <button className="update-btn" type="button" onClick={() => this.updateBuah(el.idBuah)}>Update</button>
            <button className="delete-btn" type="button" onClick={() => this.deleteBuah(el.idBuah)}>Delete</button>
          </td>
        </tr>

      )
    })
    let inputStok
    if (!this.state.updateStatus) {
      inputStok = <input type="text" name="stokBuah" placeholder="minimal 1" className="input"
        onChange={this.setValue}
      />
    } else {
      inputStok = <div class="update-stok-field">
        <input type="button" className="btn-stok" value="-" onClick={this.editStok} />
        <input type="text" name="stokBuah" placeholder="minimal 1" className="btn-stok"
          onChange={this.setValue}
        />
        <input type="button" className="btn-stok" value="+" onClick={this.editStok} />
      </div>
    }
    return (
      <div className="container">
        <div className="page-atas">
          <div className="form-buah">
            <input type="text" name="idedit" hidden />
            <div className="input-grup">
              <label>Nama Buah</label>
              <input type="text" name="stokBuah" placeholder="minimal 1" className="input"
                onChange={this.setValue} />

            </div>
            <div className="input-grup">
              <label>Stok Buah</label>
              {inputStok}

            </div>
            <div className="input-grup">
              <label>harga Buah</label>
              <input type="text" name="hargaBuah" placeholder="minimal 1" className="input"
                onChange={this.setValue}
              />
            </div>

            <input type="button" name="tambah" value="Tambah" onClick={this.tambah} className="input" />
          </div>
        </div>
        <div className="page-bawah">
          <table className="table-buah">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="bodytable">
              {dataTable}
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

export default App;