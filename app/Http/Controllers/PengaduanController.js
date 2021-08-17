const Pengaduan = require('../../Models/Pengaduan');

async function index(req, res, next){
    try {
        let {limit = 25, skip = 0} = req.query;
        let pengaduan = await Pengaduan.find().limit(limit).skip(skip);

        return res.json({
            code: 200,
            status: 'success',
            message: 'Data semua pengaduan berhasil diambil',
            data: pengaduan
        })
    }catch (err)
    {
        return res.json({
            code: 400,
            status: 'error',
            message: 'Gagal mengambil data pengaduan',
            data: err
        })

    }

}
async function store(req, res, next){

    try{
        let payload = req.body;

        let pengaduan = new Pengaduan(payload);

        await pengaduan.save(pengaduan);

        return res.json({
            code: 201,
            status: 'success',
            message: 'Pengaduan berhasil disimpan',
            data: pengaduan
        });
    }catch (err)
    {
        if (err && err.name === 'ValidationError'){
            return res.json({
                code: 400,
                status: 'error',
                message: 'bad request',
                data: err
            })
        }
        next(err);
    }
}

async function destroy(req, res, next) {
    try {
        let pengaduan = await Pengaduan.findByIdAndDelete({_id: req.param.id});

        return res.json({
            code: 200,
            status: 'success',
            message: 'Data berhasil dihapus',
            data: pengaduan
        })
    }catch (e) {
        if (e)
        {
            return  res.json({
                code: 400,
                status: 'error',
                message: 'Terjadi kesalahaan saat mengahapus',
                data: e
            })
        }
        next(e)
    }
}

async function update(req,res,next) {
    try{
        let payload = req.body;
        let pengaduan = await Pengaduan.findOneAndUpdate({_id: req.params.id}, payload, {new: true, runValidators: true} );

        return res.json({
            code: 200,
            status: 'success',
            message: 'Data berhasil di update',
            data: pengaduan
        })
    }catch (e) {
        if (err && err.name === 'ValidationError'){
            return res.json({
                code: 400,
                status: 'error',
                message: 'bad request',
                data: err
            })
        }
        next(e);
    }
}

module.exports = {
    store,
    index,
    destroy,
    update
}