const express = require('express')

const fileUpload = require('express-fileupload');
// const cors = require('cors');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(logger('dev'));
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// express.use(fileUpload());



const SoldierCtrl = require('../controllers/soldier-ctrl')

const router = express.Router()
router.use(fileUpload());

router.post('/soldier', SoldierCtrl.createSoldier)

router.put('/soldier/:id', SoldierCtrl.updateSoldier)

router.delete('/soldier/:id', SoldierCtrl.deleteSoldier)

router.get('/soldier/:id', SoldierCtrl.getSoldierById)

// router.get('/soldiersubs/:id', SoldierCtrl.getSoldierSubsBySuperId)

router.get('/soldiersupers/:id', SoldierCtrl.getSoldierSuperBySuperName)

// router.get('/searchContent/:item', SoldierCtrl.getSoldiersBySearch)
router.get('/searchContent/:searchItem', SoldierCtrl.getSoldiersBySearch)


// router.get('/soldiers', SoldierCtrl.getSoldiers)


router.get('/superiorview/:superName', SoldierCtrl.getSoldierSuperBySuperName )

router.get('/subordinateview/:name', SoldierCtrl.getSubordinateView)


router.get('/armyuser-all-superior', SoldierCtrl.getAllSuperior)

module.exports = router

