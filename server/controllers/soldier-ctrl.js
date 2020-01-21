const Soldier = require('../models/soldier-model')


createSoldier = (req, res) => {
    const body = req.body
    let fileName = "";
    if(req.files!=null){
        let imageFile = req.files.myavata
        fileName = imageFile.name

        let destination = `${__basedir}/public/${fileName}.jpg`;
        console.log('---fileName:'+fileName+'   destination:'+destination)
        imageFile.mv(`${destination}`, function(mvresponse) {
            console.log('------mvresponse:'+mvresponse)
        });
    }else{
        console.log('the user did not set picture!')
    }
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a soldier',
        })
    }

    const soldier = new Soldier(body)

    soldier.fileName=fileName;
   if (!soldier) {
        return res.status(400).json({ success: false, error: err })
    }

  
   if(soldier.superName === null||!soldier.superName){
    console.log("create new soldiers without superior");
        soldier
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: soldier._id,
                message: 'Soldier created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Soldier not created!',
            })
        })

   }else{
       console.log("create new soldiers with superior");
           soldier
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        id: soldier._id,
                        message: 'Soldier created!',
                    })
                })
              .then(
                  //soldier.getSoldierById({ _id: req.params.superId}, (err, soldier),{$push: {subCount: 1}})
                  Soldier.updateOne({"name":soldier.superName},{$inc:{subCount:1}},function (err,doc) {
                    console.log('--soldier.superName:'+soldier.superName)
                    if(err){
                        console.log(err)
                        return
                    }
                    console.log(doc)
                }) 
              )
              .catch(error => {
                            return res.status(400).json({
                                error,
                                message: 'Soldier not created!',
                            })
                        })
    
   }    
        
}


updateSoldier = async (req, res) => {
     
    const body = req.body
    let fileName = "";

    if(req.files!=null){
        let imageFile = req.files.myavata
        fileName = imageFile.name

        let destination = `${__basedir}/public/${fileName}.jpg`;
        console.log('---fileName:'+fileName+'   destination:'+destination)
        imageFile.mv(`${destination}`, function(mvresponse) {
            console.log('------mvresponse:'+mvresponse)
        });
        console.log('filename-----'+fileName)
    }else{
        fileName = body.fileName;
        console.log('pictures remains the same---:'+fileName)
    }
   
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    Soldier.findOne({ _id: req.params.id }, (err, soldier) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Soldier not found!',
            })
        }
        originalName=soldier.name
        if(body.superName!==null&&soldier.superName==="NONE"){
               console.log('222--body.superName:'+body.superName)
               soldier.name= body.name
                soldier.sex= body.sex
                soldier.rank= body.rank
                soldier.startdate= body.startdate
                soldier.phone= body.phone
                soldier.email= body.email
                soldier.superName= body.superName
                soldier.fileName = fileName
             soldier.save()
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                id: soldier._id,
                                message: 'Soldier updated!',
                            })
                        })
                    .then(
                        //soldier.getSoldierById({ _id: req.params.superId}, (err, soldier),{$push: {subCount: 1}})
                        Soldier.updateOne({"name":body.superName},{$inc:{subCount:1}},function (err,doc) {
                        console.log('--body.superName:'+body.superName)
                        if(err){
                            console.log(err)
                            return
                        }
                        console.log(doc)
                    }) )
                    // .then(x=>{
                    //     Soldier.update({ "name":"Green"}, {
                    //         "superName":"0000"
                    //       })
                    //       console.log("-----originalName:"+originalName+"-------soldiername:"+soldier.name)
                    //     }
                    // )
                    .then(Soldier.updateMany({ superName: originalName }, { superName: soldier.name }, (e, res) => {
                        if (err) {
                            err(err)
                        } 
                    }))
                        .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'Soldier not updated!',
                            })
                        })
        }else if(soldier.superName!==null&&body.superName==="NONE"){
              console.log('--333body.superName:'+body.superName)
              origin=soldier.superName
               soldier.name= body.name
                soldier.sex= body.sex
                soldier.rank= body.rank
                soldier.startdate= body.startdate
                soldier.phone= body.phone
                soldier.email= body.email
                soldier.superName= body.superName
                soldier.fileName = fileName
             soldier.save()
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                id: soldier._id,
                                message: 'Soldier updated!',
                            })
                        })
                    .then(
                        //soldier.getSoldierById({ _id: req.params.superId}, (err, soldier),{$push: {subCount: 1}})
                        Soldier.updateOne({"name":origin},{$inc:{subCount:-1}},function (err,doc) {
                        console.log('--originName:'+origin)
                        if(err){
                            console.log(err)
                            return
                        }
                        console.log(doc)
                    }) )
                    // .then(x=>{
                    //     Soldier.update({ name:"Green"}, {
                    //         superName:"0000"
                    //       })
                    //       console.log("-----originalName"+originalName+"-------soldiername"+soldier.name)
                    //     }
                         
                    // )
                    .then(Soldier.updateMany({ superName: originalName }, { superName: soldier.name }, (e, res) => {
                        if (err) {
                            err(err)
                        } 
                    }))
                        .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'Soldier not updated!',
                            })
                        })
            
        }else if(soldier.superName!==null&&body.superName!==null&&(soldier.superName!==body.superName)){
              console.log('--444body.superName:'+body.superName)
              origin=soldier.superName
               soldier.name= body.name
                soldier.sex= body.sex
                soldier.rank= body.rank
                soldier.startdate= body.startdate
                soldier.phone= body.phone
                soldier.email= body.email
                soldier.superName= body.superName
                soldier.fileName = fileName
             soldier.save()
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                id: soldier._id,
                                message: 'Soldier updated!',
                            })
                        })
                    .then(
                        //soldier.getSoldierById({ _id: req.params.superId}, (err, soldier),{$push: {subCount: 1}})
                        Soldier.updateOne({"name":origin},{$inc:{subCount:-1}},function (err,doc) {
                        console.log('--originName:'+origin)
                        if(err){
                            console.log(err)
                            return
                        }
                        console.log(doc)
                    }) )   .then(
                        //soldier.getSoldierById({ _id: req.params.superId}, (err, soldier),{$push: {subCount: 1}})
                        Soldier.updateOne({"name":body.superName},{$inc:{subCount:1}},function (err,doc) {
                        console.log('--body.superName:'+body.superName)
                        if(err){
                            console.log(err)
                            return
                        }
                        console.log(doc)
                    }) )  
                    // .then(x=>{
                    //     Soldier.update({ name:"Green"}, {
                    //         superName:"0000"
                    //       })
                    //       console.log("-----originalName"+originalName+"-------soldiername"+soldier.name)
                    //     }
                         
                    // )
                    .then(Soldier.updateMany({ superName: originalName }, { superName: soldier.name }, (e, res) => {
                        if (err) {
                            err(err)
                        }
                    }))
                        .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'Soldier not updated!',
                            })
                        })
            
        }else{
             soldier.name= body.name
            soldier.sex= body.sex
            soldier.rank= body.rank
            soldier.startdate= body.startdate
            soldier.phone= body.phone
            soldier.email= body.email
            soldier.superName= body.superName
            soldier.fileName = fileName
             soldier.save()
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                id: soldier._id,
                                message: 'Soldier updated!',
                            })
                        })
                            // .then(x=>{
                            //     Soldier.update({ superName:"Green"}, {
                            //         superName:"0000"
                            //     })
                            //     console.log("-----originalName"+originalName+"-------soldiername"+soldier.name)
                            //     }
                                
                            // )
                            .then(Soldier.updateMany({ superName: originalName }, { superName: soldier.name }, (e, res) => {
                                if (err) {
                                    err(err)
                                } 
                            }))
                               .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'Soldier not updated!',
                            })
                        })

        }


       
    })
}

deleteSoldier = async (req, res) => {
    await Soldier.findOneAndDelete({ _id: req.params.id }, (err, soldier) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!soldier) {
            return res
                .status(404)
                .json({ success: false, error: `Soldier not found` })
        }

        if(soldier.superName!==null&&soldier.superName!=="NONE"){
            console.log("111111111")
            Soldier.updateOne({"name":soldier.superName},{$inc:{subCount:-1}},function (err,doc) {
                console.log('--soldier.superName:'+soldier.superName)
                if(err){
                    console.log(err)
                    return
                }
                console.log(doc)
            }) 
         }

        if(soldier.subCount!==0){
        console.log("222222")
        Soldier.update({"superName":soldier.name},{superName:"NONE"}, {multi: true},function (err,doc) {
            console.log('--soldier.superName:'+soldier.superName)
            if(err){
                console.log(err)
                return
            }
            console.log(doc)
        }) }
       
        return res.status(200).json({ success: true, data: soldier })
       

    }).catch(err => console.log(err))
}


getSoldierById = async (req, res) => {
    await Soldier.findOne({ _id: req.params.id }, (err, soldier) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!soldier) {
            return res
                .status(404)
                .json({ success: false, error: `Soldier not found` })
        }
        // console.log('------------Soldier Entries:'+Object.entries(soldier._doc))
        return res.status(200).json({ success: true, data: soldier })
    }).catch(err => console.log(err))
}


// getSoldiersBySearch = async (req, res) => {
//     let searchcontent=req.params.searchItem;
//     let searchInfo = {};
//     let searchItems = [{name:{$regex : searchcontent}},
//                        {sex: {$regex : searchcontent}},
//                        {rank: {$regex : searchcontent}},
//                        {startdate: {$regex : searchcontent}},
//                        {phone: {$regex : searchcontent}},
//                        {email: {$regex : searchcontent}},
//                        {superior: {$regex : searchcontent}},
//                        {noofds: {$regex : searchcontent}}
//                         ];
//     searchInfo={$or:searchItems};
//     let sortInfo = { createdAt: -1}

  
//    Soldier.find(searchInfo).sort({name: -1})
//           .then((docs) =>{
//               console.log("-------search")
//               if(docs.length===0){
//                   res.json("sorry no results");
//               }else{
//                   res.status(200).json(docs);
//               }
//           })
//           .catch((err) => {
//               res.json(err);
//           })
//         }

    //      Soldier.find(searchInfo).sort({name: -1}).exec(function(err,users)){
    //         if(err) console.log(err);
    //         {
    //             res.status(200);
    //             res.json(soldiers);
    //         }
    //     }
    // }


    getSoldiersBySearch = async (req, res) => {
        let searchcontent=req.params.searchItem;
        let searchKey = req.query.key?req.query.key:'createdAt';
        let searchOrder = req.query.order?req.query.order:"-1";
        console.log('searchKey:'+searchKey+" searchOrder:"+searchOrder)
        console.log('req.query.start:'+req.query.start+"  req.query.count:"+req.query.count)
        let start = req.query.start?req.query.start:'0';
        let countStr = req.query.count?req.query.count:'5';
        let count = parseInt(countStr)
        let start1 = parseInt(start)

        console.log('--------------------start1:'+start1+" count:"+count)
        // let i=30000;
        // while(i-->0){
        //     console.log('-------:'+i)
        // }

        let sortObj = {[searchKey]:searchOrder}
        let limit=req.query.limit;
        let searchInfo = {};
        let searchItems = [{name:{$regex : searchcontent}},
                           {sex: {$regex : searchcontent}},
                           {rank: {$regex : searchcontent}},
                           {startdate: {$regex : searchcontent}},
                           {phone: {$regex : searchcontent}},
                           {email: {$regex : searchcontent}},
                           {superior: {$regex : searchcontent}},
                           {noofds: {$regex : searchcontent}}
                            ];
        searchInfo={$or:searchItems};
        await Soldier.find(searchInfo, null, {sort: sortObj,skip: start1, limit: count},(err, soldiers) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!soldiers.length) {
                return res
                    .status(200)
                    .json({ success:true, error: `Soldiers not found`,data:soldiers})
            }
            let results =  res.status(200).json({ success: true, data: soldiers })
            return results;
        }).catch(err => console.log(err))
        }
    


// getSoldiers = async (req, res) => {
//     let searchcontent=1;
//     let searchInfo = {};
//     let searchItems = [{name:{$regex : /1/}},
//                        {sex: {$regex : /1/}},
//                        {rank: {$regex : /1/}},
//                        {startdate: {$regex : /1/}},
//                        {phone: {$regex : /1/}},
//                        {email: {$regex : /1/}},
//                        {superior: {$regex : /1/}},
//                        {noofds: {$regex : /1/}}
//                         ];
//     searchInfo={$or:searchItems};
//     await Soldier.find(searchInfo, (err, soldiers) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
//         if (!soldiers.length) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Soldiers not found` })
//         }
//         return res.status(200).json({ success: true, data: soldiers })
//     }).catch(err => console.log(err))
// }

    // getSoldierSubsBySuperId = async (req, res) => {
    //     await Soldier.find({superId: req.params.id }, (err, soldiers) => {
    //         if (err) {
    //             return res.status(400).json({ success: false, error: err })
    //         }
    //         if (!soldiers.length) {
    //             return res
    //                 .status(404)
    //                 .json({ success: false, error: `Soldiers not found` })
    //         }
    //         return res.status(200).json({ success: true, data: soldiers })
    //     }).catch(err => console.log(err))
    // }


    getSubordinateView= async (req, res) => {
        console.log("-----find super req.params:"+Object.entries(req.params))
           await Soldier.find({superName: req.params.name}, (err, soldiers) => {
              if (err) {
                  return res.status(400).json({ success: false, error: err })
              }
              if (!soldiers.length) {
                  return res
                      .status(404)
                      .json({ success: false, error: `Soldiers not found` })
              }
              console.log("-----soldiers:"+ Object.entries(soldiers) )
              return res.status(200).json({ success: true, data: soldiers })
          }).catch(err => console.log(err))
    }


    getSoldierSuperBySuperName = async (req, res) => {
        console.log("-----find super req.params:"+Object.entries(req.params))
           await Soldier.find({name: req.params.superName}, (err, soldiers) => {
              if (err) {
                  console.log("----error:"+err)
                  return res.status(400).json({ success: false, error: err })
              }
              if (!soldiers.length) {
                  console.log("----Soldiers not found:"+err)
                  return res
                      .status(404)
                      .json({ success: false, error: `Soldiers not found` })
                       
              }
              console.log("-----soldiers:"+ Object.entries(soldiers) )
              return res.status(200).json({ success: true, data: soldiers })
          }).catch(err => console.log(err))
    }

    getAllSuperior = async (req, res) => {
        console.log("hahahah")
         await Soldier.find({}, (err,superior) => {
                  if (err) {
                      return res.status(400).json({ success: false, error: err })
                  }
                  if (!superior.length) {
                      return res
                          .status(404)
                          .json({ success: false, error: `Superior not found` })
                  }
                //   console.log('-------superior:'+Object.entries(superior)+"   len:"+superior.length)
                  return res.status(200).json({ success: true, data:superior})
              }).catch(err => console.log(err))

        }

   

module.exports = {
    createSoldier,
    updateSoldier,
    deleteSoldier,
//     getSoldiers,
    getSoldierById,
    // getSoldierSubsBySuperId,
    getSoldierSuperBySuperName,
    getSoldiersBySearch,
    getAllSuperior,
    getSubordinateView,
}



