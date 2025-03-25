// testNameToSchemaMapping.js
const testNameToSchemaMapping = {
    "Bitumen": {
        "Absolute Viscosity at 60°C": "AbsoluteViscosityofBitumen",
        "Kinematic Viscosity at 135 °C": "KinematicViscosityofBitumen",
        'Ductility Test': "DuctilityofBitumen",
        'Penetration': "PenetrationofBitumen",
        'Softening Point': 'SofteningPointofBitumen',
        'Elastic Recovery': 'ElasticRecoveryofBitumen',
        'Flash Point': 'FlashPointofBitumen',
        'Specific Gravity': 'SpecificGravityofBitumen',
        'Solubility In Trichloroethylene': 'SolubilityofBitumen'
    },
    "Coarse Aggregate": {
        'Bulk Density': 'BulkDensityofCoarseAggregate',
        "Crushing Value": "CrushingValueCoarseAggregate",
        "Loss Angles Abrasion Value": 'LossAnglesofCoarseAggregate',
        'Impact Value': 'ImpactValueofCoarseAggregate',
        "Specific Gravity": 'SpecificGravityofCoarse',
        'Water Absorption': 'WaterAbsorptionofCoarse',
        'Stripping Value': 'StrippingValueofCoarse',
        'Material finer than 75 µ': 'MaterialfinerofCoarse'
    },
    "Fine Aggregate": {
        "Bulk Density": "BulkDensityofFineAggregate",
        'Specific Gravity': 'SpecificGravityofFine',
        'Water Absorption': 'WaterAbsorptionofFine',
        'Material finer than 75 µ': 'MaterialfinerofFine'
    },
    "Bituminous Mix/Core": {
        "Marshall Stability": "MarshallStabilityofbituminous",
        'ASPHALT CONTENT TEST (IGNITION)': 'AsphaltcontentofBituminous'
    },
    'Bricks': {
        'Compressive Strength': "BrickCompressiveStrength",
        'Water Absorption': 'BricksWaterAbsorption',
        'Efflorescence': 'EfflorescenceofBricks',
        'Density': 'BricksBulkDensity'
    },
    'Cement': {
        'Fineness (by Dry Sieve Method)': 'CementbyDrySieving',
        'Soundness (by Le-Chatelier)': 'CementSoundnessByLeChatelierMethod',
        'Density': 'DensityOfCementUsingLeChatelierFlask'
    },
    'Admixture/ Bipolar': {
        'Chloride Content': 'ChlorideContentofAdmixture',
        'Ash Content': 'AshContentofAdmixture',
        'Dry Material Content': 'DryContentofAdmixture',
        'pH Value': 'PhValueofAdmixture'
    }
};

module.exports = testNameToSchemaMapping;