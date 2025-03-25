module.exports = (models) => {
    // User Associations
    models.User.hasMany(models.Client, { foreignKey: 'UserId' });
    models.User.hasMany(models.ClientUser, { foreignKey: 'UserId', as: 'ClientUser' });
    models.User.hasMany(models.LabJob, { foreignKey: 'UserId', });
    models.User.hasMany(models.CustomerRegistration, { foreignKey: "UserId" });
    models.User.hasMany(models.CustomerOrder, { foreignKey: "UserId" });
    models.User.hasMany(models.UnitMaster, { foreignKey: 'UserId' });
    models.User.belongsTo(models.Client, { foreignKey: 'createdBy', as: 'clientfulldata' });
    models.User.hasMany(models.Oldreport, { foreignKey: 'UserId' });
    // Client Associations
    models.Client.belongsTo(models.User, { foreignKey: 'UserId', as: 'Userschemadata' }); // Ensure this alias is unique
    models.Client.hasMany(models.User, { foreignKey: "createdBy" })
    models.Client.hasMany(models.UpdateLog, { foreignKey: 'clientId' })
        //Updatelog 
    models.UpdateLog.belongsTo(models.Client, { foreignKey: 'clientId', as: 'clientdata' })
        // ClientUser
    models.ClientUser.belongsTo(models.User, { foreignKey: 'UserId' });
    // CustomerRegistration
    models.CustomerRegistration.hasMany(models.CustomerOrder, { foreignKey: 'RegistrationId' });
    models.CustomerRegistration.belongsTo(models.User, { foreignKey: 'UserId', as: "userinfo" });
    // Eightentrytemplate 
    models.Eightentrytemplate.hasMany(models.Valueofeightentrytemplate, { foreignKey: 'EightentrytemplateId', as: 'Eightentrytemplatejoint' })
    models.Valueofeightentrytemplate.belongsTo(models.Eightentrytemplate, { foreignKey: 'EightentrytemplateId' })
        // five entrytemplate
    models.Fiveentrytemplate.hasMany(models.Valueoffiveentrytemplate, { foreignKey: 'FiveentrytemplateId', as: 'Fiveentrytemplatejoint' })
    models.Fiveentrytemplate.belongsTo(models.TestDetails, { foreignKey: "testId" })
    models.Valueoffiveentrytemplate.belongsTo(models.Fiveentrytemplate, { foreignKey: 'FiveentrytemplateId' })
        // four entrytemplate
    models.Fourentrytemplate.hasMany(models.Valueoffourentrytemplate, { foreignKey: 'FourentrytemplateId', as: 'Fourentrytemplatejoint' })
    models.Fourentrytemplate.belongsTo(models.TestDetails, { foreignKey: "testId" })
    models.Valueoffourentrytemplate.belongsTo(models.Fourentrytemplate, { foreignKey: 'FourentrytemplateId' })
        // labjob
    models.LabJob.hasMany(models.Oldreport, { foreignKey: "labjobId", });
    models.LabJob.hasMany(models.TestofLabJob, { foreignKey: 'LabJobId', as: 'testofLabJobs' });
    models.LabJob.belongsTo(models.Product, { foreignKey: 'ProductId', as: 'product' });
    models.LabJob.belongsTo(models.CustomerOrder, { foreignKey: 'customerOrderId', as: 'customerOrder' });
    models.LabJob.belongsTo(models.Staffofcompany, { foreignKey: 'signwith', as: "staffofcompany" });
    models.LabJob.belongsTo(models.Staffofcompany, { foreignKey: 'verifiedby', as: 'verifiedByStaff' });
    models.LabJob.belongsTo(models.Staffofcompany, { foreignKey: "AuthorisedSignatory", as: "authorisedSignatory" });
    models.LabJob.belongsTo(models.User, { foreignKey: 'UserId', as: 'userdata' });

    models.TestofLabJob.belongsTo(models.LabJob, { foreignKey: 'LabJobId', as: 'labJob' });
    models.TestofLabJob.belongsTo(models.TestDetails, { foreignKey: 'Testid', as: 'testDetails' });
    // loginlog
    models.LoginLog.belongsTo(models.User, { foreignKey: "userId", as: "userdata" })
        // masterlistofrecord
    models.Masterlistofrecord.belongsTo(models.TestDetails, { foreignKey: 'testId', as: 'testDetails' });
    models.Masterlistofrecord.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    // masterlistofformate
    models.Masterofreportformate.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    // master
    models.Product.hasMany(models.TestDetails, { foreignKey: 'ProductId', as: 'testDetails' });
    models.Product.hasMany(models.Staffauthrizedtest, { as: 'product', foreignKey: 'ProductsId' });
    models.TestDetails.belongsTo(models.Product, { foreignKey: 'ProductId' });
    // nine entrytemplate
    models.Nineentrytemplate.hasMany(models.Valueofnineentrytemplate, { foreignKey: 'NineentrytemplateId', as: 'Nineentrytemplatejoint' })
    models.Valueofnineentrytemplate.belongsTo(models.Nineentrytemplate, { foreignKey: 'NineentrytemplateId' })
        // oldreport
    models.Oldreport.belongsTo(models.LabJob, { foreignKey: "labjobId", as: "allreportdata" })
    models.Oldreport.hasMany(models.Oldreportextanote, { foreignKey: "oldreportId", as: 'reportnotes' })
    models.Oldreport.belongsTo(models.User, { foreignKey: 'UserId', as: 'usercheck' })
    models.Oldreportextanote.belongsTo(models.Oldreport, { foreignKey: "oldreportId" })
        // customerorder
    models.CustomerOrder.belongsTo(models.User, { foreignKey: 'UserId', as: 'OrderCreator' }); // Ensure this alias is unique
    models.CustomerOrder.belongsTo(models.CustomerRegistration, { foreignKey: 'RegistrationId', as: 'customerdata' });
    models.CustomerOrder.hasMany(models.LabJob, { foreignKey: 'customerOrderId', as: 'labJobs' });
    models.CustomerOrder.belongsTo(models.User, { foreignKey: "UserId", as: 'userdata' })
        // seven entrytemplate
    models.Sevenentrytemplate.hasMany(models.Valueofsevenentrytemplate, { foreignKey: 'SevenentrytemplateId', as: 'Sevenentrytemplatejoint' })
    models.Valueofsevenentrytemplate.belongsTo(models.Sevenentrytemplate, { foreignKey: 'SevenentrytemplateId' })
        // sixentrytemplate
    models.Sixentrytemplate.hasMany(models.Valueofsixentrytemplate, { foreignKey: 'SixentrytemplateId', as: 'Sixentrytemplatejoint' })
    models.Valueofsixentrytemplate.belongsTo(models.Sixentrytemplate, { foreignKey: 'SixentrytemplateId' })
        // staffmaster
    models.Staffofcompany.hasMany(models.Staffauthrizedtest, { as: 'authorizedTests', foreignKey: 'StaffofcompanyId' });
    models.Staffofcompany.hasMany(models.LabJob, { foreignKey: 'signwith', })
    models.Staffofcompany.hasMany(models.LabJob, { foreignKey: "verifiedby" })
    models.Staffauthrizedtest.belongsTo(models.Staffofcompany, { foreignKey: 'StaffofcompanyId' });
    models.Staffauthrizedtest.belongsTo(models.Product, { foreignKey: 'ProductsId', as: 'product' });
    // testinfoeight
    models.TestInfoEight.hasMany(models.TestInfoEightValue, { foreignKey: 'TestInfoEightId', as: 'TestInfoEightjoint' })
    models.TestInfoEightValue.belongsTo(models.TestInfoEight, { foreignKey: 'TestInfoEightId' })
        // testinfoeleven
    models.TestInfoEleven.hasMany(models.TestInfoElevenValue, { foreignKey: 'TestInfoElevenId', as: 'TestInfoElevenjoint' })
    models.TestInfoElevenValue.belongsTo(models.TestInfoEleven, { foreignKey: 'TestInfoElevenId' })
        // testinfofive
    models.TestInfoFive.hasMany(models.TestInfoFiveValue, { foreignKey: 'TestInfoFiveId', as: 'TestInfoFivejoint' })
    models.TestInfoFiveValue.belongsTo(models.TestInfoFive, { foreignKey: 'TestInfoFiveId' })
        // testinfofour
    models.TestInfoFour.hasMany(models.TestInfoFourValue, { foreignKey: 'TestInfoFourId', as: 'TestInfoFourjoint' })
    models.TestInfoFourValue.belongsTo(models.TestInfoFour, { foreignKey: 'TestInfoFourId' })
        // testinfonine
    models.TestInfoNine.hasMany(models.TestInfoNineValue, { foreignKey: 'TestInfoNineId', as: 'TestInfoNinejoint' })
    models.TestInfoNineValue.belongsTo(models.TestInfoNine, { foreignKey: 'TestInfoNineId' })
        // testinfoseven
    models.TestInfoSeven.hasMany(models.TestInfoSevenValue, { foreignKey: 'TestInfoSevenId', as: 'TestInfoSevenjoint' })
    models.TestInfoSevenValue.belongsTo(models.TestInfoSeven, { foreignKey: 'TestInfoSevenId' })
        // testnfosix
    models.TestInfoSix.hasMany(models.TestInfoSixValue, { foreignKey: 'TestInfoSixId', as: 'TestInfoSixjoint' })
    models.TestInfoSixValue.belongsTo(models.TestInfoSix, { foreignKey: 'TestInfoSixId' })
        // testinfoten
    models.TestInfoTen.hasMany(models.TestInfoTenValue, { foreignKey: 'TestInfoTenId', as: 'TestInfoTenjoint' })
    models.TestInfoTenValue.belongsTo(models.TestInfoTen, { foreignKey: 'TestInfoTenId' })
        // testinfotwelve
    models.TestInfoTwelve.hasMany(models.TestInfoTwelveValue, { foreignKey: 'TestInfoTwelveId', as: 'TestInfoTwelvejoint' })
    models.TestInfoTwelveValue.belongsTo(models.TestInfoTwelve, { foreignKey: 'TestInfoTwelveId' })
        // threeentrytemplate
    models.Threeentrytemplate.hasMany(models.Valueofthreeentrytemplate, { foreignKey: 'ThreeentrytemplateId', as: 'Threeentrytemplatejoint' })
    models.Threeentrytemplate.belongsTo(models.TestDetails, { foreignKey: "testId" })
    models.Valueofthreeentrytemplate.belongsTo(models.Threeentrytemplate, { foreignKey: 'ThreeentrytemplateId' })
        // twoentrytemplate
    models.Twoentrytemplate.hasMany(models.Valueoftwoentrytemplate, { foreignKey: 'TwoentrytemplateId', as: 'Twoentrytemplatejoint' })
    models.Twoentrytemplate.belongsTo(models.TestDetails, { foreignKey: "testId" })
    models.Valueoftwoentrytemplate.belongsTo(models.Twoentrytemplate, { foreignKey: 'TwoentrytemplateId' })
        // unitmaster
    models.UnitMaster.belongsTo(models.User, { foreignKey: 'UserId', as: 'userrole' })
        // UserPage
    models.UserPage.belongsTo(models.Product, { foreignKey: 'ProductId' });
    models.Product.hasMany(models.UserPage, { foreignKey: 'ProductId' });
    models.UserPage.belongsTo(models.User, { foreignKey: "UserId" });
    models.UserPage.hasMany(models.ProductTestacc, { foreignKey: 'UserPageId', as: "clienttests" });
    models.ProductTestacc.belongsTo(models.UserPage, { foreignKey: "UserPageId" });
    models.ProductTestacc.belongsTo(models.TestDetails, { foreignKey: "TestDetailId" });
    models.TestDetails.hasMany(models.ProductTestacc, { foreignKey: 'TestDetailId' })
}