// schemasConfig.js
const baseModelConfig = {
    model: 'Commonschema',
    path: '../schemas/Commonschema',
    fields: {
        labJobId: 'labjobid',
        testId: 'testid',
        SampleTested: 'SampleTested',
        DescriptionofSample: 'DescriptionofSample',
        unit: 'unit',
        Mean: 'Mean'
    },
    relation: 'parent',
    testid: 'testId',
    labjobid: 'labJobId',
    UserId: 'UserId',
};

const schemasConfig = {
    AbsoluteViscosityofBitumen: {
        model1: {...baseModelConfig },
        model2: {
            model: 'AbsoluteViscosityofBitumen2', // Second model if needed
            path: '../schemas/AbsoluteViscosityofBitumen', // Adjust path accordingly
            fields: {
                Descriptionoftube: 'Descriptionoftube',
                CalibrationFactor: 'CalibrationFactor',
                TestTemperature: 'TestTemperature',
                Flowtime: 'Flowtime',
                Viscosity: 'Viscosity'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'absotest',
            labjointkey: 'absojob',
            Userjointkey: 'absoUser',
            jointkey: 'abviscosity',
            testId: '1'
        }
    },
    KinematicViscosityofBitumen: {
        model1: {...baseModelConfig },
        model2: {
            model: 'KinematicViscosityofBitumen2', // Second model if needed
            path: '../schemas/KinematicViscosityofBitumen', // Adjust path accordingly
            fields: {
                Descriptionoftube: 'Descriptionoftube',
                CalibrationFactor: 'CalibrationFactor',
                TestTemperature: 'TestTemperature',
                Flowtime: 'Flowtime',
                Viscosity: 'Viscosity'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'kinetest',
            labjointkey: 'kinejob',
            Userjointkey: 'kineUser',
            jointkey: 'kineviscosity',
            testId: '2'
        }
    },
    CrushingValueCoarseAggregate: {
        model1: {...baseModelConfig },
        model2: {
            model: 'CrushingValueCoarseAggregate2',
            path: '../schemas/CrushingValueCoarseAggregate',
            fields: {
                A: "A",
                B: 'B',
                C: 'C',
                Crushingvalue: 'Crushingvalue'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'crushtest',
            labjointkey: 'crushjob',
            Userjointkey: 'crushUser',
            jointkey: 'crushingvalue',
            testId: "13"
        }
    },
    DuctilityofBitumen: {
        model1: {...baseModelConfig },
        model2: {
            model: 'DuctilityofBitumen2',
            path: "../schemas/DuctilityofBitumen",
            fields: {
                Ductility: 'Ductility'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'ducttest',
            labjointkey: 'ductjob',
            Userjointkey: 'ductUser',
            jointkey: 'ductility',
            testId: '3'
        }
    },
    PenetrationofBitumen: {
        model1: {...baseModelConfig },
        model2: {
            model: 'PenetrationofBitumen2',
            path: "../schemas/PenetrationofBitumen",
            fields: {
                penetration: 'penetration'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'penetest',
            labjointkey: 'penejob',
            Userjointkey: 'peneUser',
            jointkey: 'penetration',
            testId: "5"
        }
    },
    SofteningPointofBitumen: {
        model1: {...baseModelConfig },
        model2: {
            model: 'SofteningPointofBitumen2',
            path: "../schemas/SofteningPointofBitumen",
            fields: {
                softeningpoint: 'softeningpoint'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'softtest',
            labjointkey: 'softjob',
            Userjointkey: 'softUser',
            jointkey: 'softening',
            testId: '6'
        }
    },
    ElasticRecoveryofBitumen: {
        model1: {...baseModelConfig },
        model2: {
            model: 'ElasticRecoveryofBitumen2',
            path: "../schemas/ElasticRecoveryofBitumen",
            fields: {
                combinedspecimen: 'combinedspecimen',
                elasticrecovery: 'elasticrecovery'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'elastest',
            labjointkey: 'elasjob',
            Userjointkey: 'elasUser',
            jointkey: 'elastic',
            testId: "9"
        }
    },
    BulkDensityofCoarseAggregate: {
        model1: {...baseModelConfig },
        model2: {
            model: 'BulkDensityofCoarseAggregate2',
            path: '../schemas/BulkDensityofCoarseAggregate',
            fields: {
                A: "A",
                B: 'B',
                bulkdensity: 'bulkdensity'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'bulktest',
            labjointkey: 'bulkjob',
            Userjointkey: 'bulkUser',
            jointkey: 'densitycoarse',
            testId: '12'
        }
    },
    FlashPointofBitumen: {
        model1: {
            model: 'FlashPointofBitumen1',
            path: '../schemas/FlashPointofBitumen',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                DescriptionofSample: 'DescriptionofSample',
                unit: 'unit',
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'FlashPointofBitumen2',
            path: '../schemas/FlashPointofBitumen',
            fields: {
                flashpoint: "flashpoint",
                firepoint: 'firepoint'
            },
            relation: 'child', // Define as child
            parentKey: 'FlashPointofBitumen1Id', // Foreign key linking to parent
            testjointkey: 'flashtest',
            labjointkey: 'flashjob',
            Userjointkey: "flashUser",
            jointkey: 'flashpoint',
            testId: '4'
        }
    },
    LossAnglesofCoarseAggregate: {
        model1: {...baseModelConfig },
        model2: {
            model: 'LossAnglesofCoarseAggregate2',
            path: '../schemas/LossAnglesofCoarseAggregate',
            fields: {
                A: "A",
                B: 'B',
                abrasionvalue: 'abrasionvalue'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'losstest',
            labjointkey: 'lossjob',
            Userjointkey: 'lossUser',
            jointkey: 'lossangles',
            testId: '15'
        }
    },
    ImpactValueofCoarseAggregate: {
        model1: {...baseModelConfig },
        model2: {
            model: 'ImpactValueofCoarseAggregate2',
            path: '../schemas/ImpactValueofCoarseAggregate',
            fields: {
                A: "A",
                B: 'B',
                weightretained: 'weightretained',
                impactvalue: 'impactvalue'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'impatest',
            labjointkey: 'impajob',
            Userjointkey: 'impaUser',
            jointkey: 'impactvalue',
            testId: '14'
        }
    },
    SpecificGravityofBitumen: {
        model1: {...baseModelConfig },
        model2: {
            model: 'SpecificGravityofBitumen2', // Second model if needed
            path: '../schemas/SpecificGravityofBitumen', // Adjust path accordingly
            fields: {
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
                G: 'G'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'spectest',
            labjointkey: 'specjob',
            Userjointkey: 'specUser',
            jointkey: "alldatagrivit",
            testId: '8'
        }
    },
    SolubilityofBitumen: {
        model1: {...baseModelConfig },
        model2: {
            model: 'SolubilityofBitumen2', // Second model if needed
            path: '../schemas/SolubilityofBitumen', // Adjust path accordingly
            fields: {
                W1: 'W1',
                W2: 'W2',
                W3: 'W3',
                W4: 'W4',
                trichloroethylene: 'trichloroethylene'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'solutest',
            labjointkey: 'solujob',
            Userjointkey: 'soluUser',
            jointkey: 'alldata',
            testId: "7"
        }
    },
    MarshallStabilityofbituminous: {
        model1: {
            model: 'MarshallStabilityofbituminous1',
            path: '../schemas/MarshallStabilityofbituminous',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                DescriptionofSample: 'DescriptionofSample',
                unit: 'unit',
                StabilityMean: 'StabilityMean',
                FlowMean: 'FlowMean'
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'MarshallStabilityofbituminous2',
            path: '../schemas/MarshallStabilityofbituminous',
            fields: {
                bindercontent: "bindercontent",
                specimenno: 'specimenno',
                measuredstability: 'measuredstability',
                correctionfactor: 'correctionfactor',
                stabilityaftercorrection: 'stabilityaftercorrection',
                flowvalue: 'flowvalue',

            },
            relation: 'child', // Define as child
            parentKey: 'MarshallStabilityofbituminous1Id', // Foreign key linking to parent
            testjointkey: 'marsttest',
            labjointkey: 'marstjob',
            Userjointkey: "marstUser",
            jointkey: 'marshallstabiltiy',
            testId: '10'
        }
    },
    AsphaltcontentofBituminous: {
        model1: {...baseModelConfig },
        model2: {
            model: 'AsphaltcontentofBituminous2', // Second model if needed
            path: '../schemas/AsphaltcontentofBituminous', // Adjust path accordingly
            fields: {
                furnacetemp: 'furnacetemp',
                sampleweight: 'sampleweight',
                finalweight: 'finalweight',
                weightloss: 'weightloss',
                weightlosspersent: 'weightlosspersent',
                asphaltcontent: 'asphaltcontent'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'ascontest',
            labjointkey: 'asconjob',
            Userjointkey: 'asconUser',
            jointkey: "asphaltcontent",
            testId: '11'
        }
    },
    SpecificGravityofCoarse: {
        model1: {
            model: 'SpecificGravityofCoarse1',
            path: '../schemas/SpecificGravityofCoarse',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                DescriptionofSample: 'DescriptionofSample',
                unit: 'unit',
                MeanofSpecificgravity: 'MeanofSpecificgravity',
                Mean: 'Mean'
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'SpecificGravityofCoarse2',
            path: '../schemas/SpecificGravityofCoarse',
            fields: {
                A1: "A1",
                A2: 'A2',
                A: 'A',
                B: 'B',
                C: 'C',
                ovendriedspecificgravity: 'ovendriedspecificgravity',
                specificgravity: 'specificgravity'

            },
            relation: 'child', // Define as child
            parentKey: 'SpecificGravityofCoarse1Id', // Foreign key linking to parent
            testjointkey: 'spgrcotest',
            labjointkey: 'spgrcojob',
            Userjointkey: "spgrcoUser",
            jointkey: 'gravitycoarse',
            testId: '16'
        }
    },
    WaterAbsorptionofCoarse: {
        model1: {...baseModelConfig },
        model2: {
            model: 'WaterAbsorptionofCoarse2', // Second model if needed
            path: '../schemas/WaterAbsorptionofCoarse', // Adjust path accordingly
            fields: {
                A1: "A1",
                A2: 'A2',
                A: 'A',
                B: 'B',
                C: 'C',
                waterabsorption: 'waterabsorption'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'waabcotest',
            labjointkey: 'waabcojob',
            Userjointkey: 'waabcoUser',
            jointkey: "absorptioncoarse",
            testId: '17'
        }
    },
    StrippingValueofCoarse: {
        model1: {...baseModelConfig },
        model2: {
            model: 'StrippingValueofCoarse2', // Second model if needed
            path: '../schemas/StrippingValueofCoarse', // Adjust path accordingly
            fields: {
                sampleweight: "sampleweight",
                bitumenweight: 'bitumenweight',
                totalaggregate: 'totalaggregate',
                uncoveredaggregate: 'uncoveredaggregate',
                strippingvalue: 'strippingvalue',
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'stvacotest',
            labjointkey: 'stvacojob',
            Userjointkey: 'stvacoUser',
            jointkey: "strippingcoarse",
            testId: '18'
        }
    },
    MaterialfinerofCoarse: {
        model1: {
            model: 'MaterialfinerofCoarse1',
            path: '../schemas/MaterialfinerofCoarse',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'MaterialfinerofCoarse2',
            path: '../schemas/MaterialfinerofCoarse',
            fields: {
                sievesize: "sievesize",
                sampleweight: 'sampleweight',
                weightafterdry: 'weightafterdry',
                materialfiner: 'materialfiner',
            },
            relation: 'child', // Define as child
            parentKey: 'MaterialfinerofCoarse1Id', // Foreign key linking to parent
            testjointkey: 'maficotest',
            labjointkey: 'maficojob',
            Userjointkey: "maficoUser",
            jointkey: 'materialfinercoarse',
            testId: '20'
        }
    },
    BulkDensityofFineAggregate: {
        model1: {...baseModelConfig },
        model2: {
            model: 'BulkDensityofFineAggregate2',
            path: '../schemas/BulkDensityofFineAggregate',
            fields: {
                A: "A",
                B: 'B',
                bulkdensity: 'bulkdensity'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'bulkfinetest',
            labjointkey: 'bulkfinejob',
            Userjointkey: 'bulkfineUser',
            jointkey: 'densityfine',
            testId: '21'
        }
    },
    SpecificGravityofFine: {
        model1: {
            model: 'SpecificGravityofFine1',
            path: '../schemas/SpecificGravityofFine',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
                MeanofSpecificgravity: 'MeanofSpecificgravity',
                Mean: 'Mean'
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'SpecificGravityofFine2',
            path: '../schemas/SpecificGravityofFine',
            fields: {
                W1: "W1",
                W2: 'W2',
                W3: 'W3',
                W4: 'W4',
                ovendriedspecificgravity: 'ovendriedspecificgravity',
                specificgravity: 'specificgravity'

            },
            relation: 'child', // Define as child
            parentKey: 'SpecificGravityofFine1Id', // Foreign key linking to parent
            testjointkey: 'spgrfitest',
            labjointkey: 'spgrfijob',
            Userjointkey: "spgrfiUser",
            jointkey: 'gravityfine',
            testId: '22'
        }
    },
    WaterAbsorptionofFine: {
        model1: {...baseModelConfig },
        model2: {
            model: 'WaterAbsorptionofFine2', // Second model if needed
            path: '../schemas/WaterAbsorptionofFine', // Adjust path accordingly
            fields: {
                W1: "W1",
                W2: 'W2',
                W3: 'W3',
                W4: 'W4',
                waterabsorption: 'waterabsorption'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'waabfitest',
            labjointkey: 'waabfijob',
            Userjointkey: 'waabfiUser',
            jointkey: "absorptionfine",
            testId: '23'
        }
    },
    MaterialfinerofFine: {
        model1: {
            model: 'MaterialfinerofFine1',
            path: '../schemas/MaterialfinerofFine',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'MaterialfinerofFine2',
            path: '../schemas/MaterialfinerofFine',
            fields: {
                sievesize: "sievesize",
                sampleweight: 'sampleweight',
                weightafterdry: 'weightafterdry',
                materialfiner: 'materialfiner',
            },
            relation: 'child', // Define as child
            parentKey: 'MaterialfinerofFine1Id', // Foreign key linking to parent
            testjointkey: 'mafifitest',
            labjointkey: 'mafifijob',
            Userjointkey: "mafifiUser",
            jointkey: 'materialfinerfine',
            testId: '24'
        }
    },
    BrickCompressiveStrength: {
        model1: {
            model: 'BrickCompressiveStrength1',
            path: '../schemas/BrickCompressiveStrength',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
                timeofimmersionaftergrinding: 'timeofimmersionaftergrinding',
                timeofremovalwater: 'timeofremovalwater',
                timeoffrogfilling: 'timeoffrogfilling',
                timestorejutebagsfrog: 'timestorejutebagsfrog',
                timeremovaljutebags: 'timeremovaljutebags',
                roomtemp: 'roomtemp',
                timeimmersionwater: 'timeimmersionwater',
                Mean: 'Mean',
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'BrickCompressiveStrength2',
            path: '../schemas/BrickCompressiveStrength',
            fields: {
                idmark: "idmark",
                length: 'length',
                breadth: 'breadth',
                badfacearea: 'badfacearea',
                maxload: 'maxload',
                compressivestrength: 'compressivestrength'
            },
            relation: 'child', // Define as child
            parentKey: 'BrickCompressiveStrength1Id', // Foreign key linking to parent
            testjointkey: 'brcosttest',
            labjointkey: 'brcostjob',
            Userjointkey: "brcostUser",
            jointkey: 'brickcompressive',
            testId: '25'
        }
    },
    BricksWaterAbsorption: {
        model1: {
            model: 'BricksWaterAbsorption1',
            path: '../schemas/BricksWaterAbsorption',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
                ovendrytemp: 'ovendrytemp',
                immersiontemp: 'immersiontemp',
                timeimmersionwater: 'timeimmersionwater',
                timeremovalwater: 'timeremovalwater',
                Mean: 'Mean',
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'BricksWaterAbsorption2',
            path: '../schemas/BricksWaterAbsorption',
            fields: {
                M1: "M1",
                M2: 'M2',
                waterabsorption: 'waterabsorption',
            },
            relation: 'child', // Define as child
            parentKey: 'BricksWaterAbsorption1Id', // Foreign key linking to parent
            testjointkey: 'brwaabtest',
            labjointkey: 'brwaabjob',
            Userjointkey: "brwaabUser",
            jointkey: 'brickabsorption',
            testId: '26'
        }
    },
    EfflorescenceofBricks: {
        model1: {
            model: 'EfflorescenceofBricks1',
            path: '../schemas/EfflorescenceofBricks',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
                roomtemp: 'roomtemp',
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'EfflorescenceofBricks2',
            path: '../schemas/EfflorescenceofBricks',
            fields: {
                brickmark: "brickmark",
                Efflorescence: 'Efflorescence',
            },
            relation: 'child', // Define as child
            parentKey: 'EfflorescenceofBricks1Id', // Foreign key linking to parent
            testjointkey: 'brefftest',
            labjointkey: 'breffjob',
            Userjointkey: "breffUser",
            jointkey: 'brickefflorescence',
            testId: '27'
        }
    },
    BricksBulkDensity: {
        model1: {...baseModelConfig },
        model2: {
            model: 'BricksBulkDensity2', // Second model if needed
            path: '../schemas/BricksBulkDensity', // Adjust path accordingly
            fields: {
                mark: "mark",
                length: 'length',
                width: 'width',
                height: 'height',
                volume: 'volume',
                mass: 'mass',
                Density: 'Density'
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'brbulkdetest',
            labjointkey: 'brbulkdejob',
            Userjointkey: 'brbulkdeUser',
            jointkey: "densitybrick",
            testId: '28'
        }
    },
    CementbyDrySieving: {
        model1: {
            model: 'CementbyDrySieving1',
            path: '../schemas/CementbyDrySieving',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
                Mean: 'Mean',
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'CementbyDrySieving2',
            path: '../schemas/CementbyDrySieving',
            fields: {
                W1: "W1",
                W2: 'W2',
                R: 'R'
            },
            relation: 'child', // Define as child
            parentKey: 'CementbyDrySieving1Id', // Foreign key linking to parent
            testjointkey: 'cebydrsitest',
            labjointkey: 'cebydrsijob',
            Userjointkey: "cebydrsiUser",
            jointkey: 'cementdrysieving',
            testId: '29'
        }
    },
    CementSoundnessByLeChatelierMethod: {
        model1: {
            model: 'CementSoundnessByLeChatelierMethod1',
            path: '../schemas/CementSoundnessByLeChatelierMethod',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
                Mean: 'Mean',
                roomtemp: 'roomtemp',
                roomhumidity: 'roomhumidity',
                cementweight: 'cementweight',
                waterweight: 'waterweight'
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'CementSoundnessByLeChatelierMethod2',
            path: '../schemas/CementSoundnessByLeChatelierMethod',
            fields: {
                D1: "D1",
                D2: 'D2',
                D: 'D'
            },
            relation: 'child', // Define as child
            parentKey: 'CementSoundnessByLeChatelierMethod1Id', // Foreign key linking to parent
            testjointkey: 'cesobylichtest',
            labjointkey: 'cesobylichjob',
            Userjointkey: "cesobylichUser",
            jointkey: 'cementsoundnesslichatelier',
            testId: '30'
        }
    },
    DensityOfCementUsingLeChatelierFlask: {
        model1: {
            model: 'DensityOfCementUsingLeChatelierFlask1',
            path: '../schemas/DensityOfCementUsingLeChatelierFlask',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
                Mean: 'Mean',
                roomtemp: 'roomtemp',
                kerosenedensity: 'kerosenedensity',
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'DensityOfCementUsingLeChatelierFlask2',
            path: '../schemas/DensityOfCementUsingLeChatelierFlask',
            fields: {
                a: "a",
                b: 'b',
                c: 'c',
                d: 'd',
                density: 'density'
            },
            relation: 'child', // Define as child
            parentKey: 'DensityOfCementUsingLeChatelierFlask1Id', // Foreign key linking to parent
            testjointkey: 'cedebylichtest',
            labjointkey: 'cedebylichjob',
            Userjointkey: "cedebylichUser",
            jointkey: 'cementdensitylichatelier',
            testId: '31'
        }
    },
    ChlorideContentofAdmixture: {
        model1: {...baseModelConfig },
        model2: {
            model: 'ChlorideContentofAdmixture2', // Second model if needed
            path: '../schemas/ChlorideContentofAdmixture', // Adjust path accordingly
            fields: {
                samplevolume: "samplevolume",
                ammoniumvolume: 'ammoniumvolume',
                nitratevolume: 'nitratevolume',
                chloridecontent: 'chloridecontent',
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'chcoadtest',
            labjointkey: 'chcoadjob',
            Userjointkey: 'chcoadUser',
            jointkey: "chloridadmixture",
            testId: '31'
        }
    },
    AshContentofAdmixture: {
        model1: {...baseModelConfig },
        model2: {
            model: 'AshContentofAdmixture2', // Second model if needed
            path: '../schemas/AshContentofAdmixture', // Adjust path accordingly
            fields: {
                W1: "W1",
                W2: 'W2',
                W3: 'W3',
                ashcontent: 'ashcontent',
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'ashcoadtest',
            labjointkey: 'ashcoadjob',
            Userjointkey: 'ashcoadUser',
            jointkey: "ashadmixture",
            testId: '32'
        }
    },
    DryContentofAdmixture: {
        model1: {...baseModelConfig },
        model2: {
            model: 'DryContentofAdmixture2', // Second model if needed
            path: '../schemas/DryContentofAdmixture', // Adjust path accordingly
            fields: {
                W1: "W1",
                W2: 'W2',
                W3: 'W3',
                drycontent: 'drycontent',
            },
            relation: 'child', // Define as child
            parentKey: 'CommonschemaId', // Foreign key linking to parent
            testjointkey: 'drycoadtest',
            labjointkey: 'drycoadjob',
            Userjointkey: 'drycoadUser',
            jointkey: "dryadmixture",
            testId: '33'
        }
    },
    PhValueofAdmixture: {
        model1: {
            model: 'PhValueofAdmixture1',
            path: '../schemas/PhValueofAdmixture',
            fields: {
                labJobId: 'labjobid',
                testId: 'testid',
                SampleTested: 'SampleTested',
                unit: 'unit',
                Mean: 'Mean',
                labtemp: 'labtemp',
                samplevalue: 'samplevalue',
            },
            relation: 'parent',
            testid: 'testId',
            labjobid: 'labJobId',
            UserId: 'UserId',
        },
        model2: {
            model: 'PhValueofAdmixture2',
            path: '../schemas/PhValueofAdmixture',
            fields: {
                phvalue: "phvalue",
                remarks: 'remarks',
            },
            relation: 'child', // Define as child
            parentKey: 'PhValueofAdmixture1Id', // Foreign key linking to parent
            testjointkey: 'phvatest',
            labjointkey: 'phvajob',
            Userjointkey: "phvaUser",
            jointkey: 'phofadmixture',
            testId: '34'
        }
    },
};

module.exports = schemasConfig;