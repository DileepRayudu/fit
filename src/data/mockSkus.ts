import { TechPackSpec, DatasetSample } from '../types';

export const MOCK_SKUS: TechPackSpec[] = [
  {
    skuId: "SKU-DENIM-001",
    title: "Raw Selvage Zero-Stretch Denim Trucker Jacket",
    brand: "AeroWear Denim Co.",
    category: "Outerwear",
    gender: "Men",
    techPackSource: "AeroWear_TechPack_2026_V3.pdf",
    fabric: {
      gsm: 420,
      fabricType: "100% Cotton Raw Denim",
      stretchPercent: 0,
      shrinkagePercent: 3.5,
      composition: "100% Rigid Heavyweight Cotton"
    },
    declaredSizeTable: {
      S: { chestCm: 102, shoulderCm: 44, waistCm: 96, hipsCm: 98, lengthCm: 64, sleeveCm: 62, stretchToleranceCm: 0 },
      M: { chestCm: 108, shoulderCm: 46, waistCm: 102, hipsCm: 104, lengthCm: 66, sleeveCm: 64, stretchToleranceCm: 0 },
      L: { chestCm: 114, shoulderCm: 48, waistCm: 108, hipsCm: 110, lengthCm: 68, sleeveCm: 65.5, stretchToleranceCm: 0 },
      XL: { chestCm: 122, shoulderCm: 50.5, waistCm: 116, hipsCm: 118, lengthCm: 70, sleeveCm: 67, stretchToleranceCm: 0 },
      XXL: { chestCm: 130, shoulderCm: 53, waistCm: 124, hipsCm: 126, lengthCm: 72, sleeveCm: 68.5, stretchToleranceCm: 0 }
    },
    historicalReturns: {
      totalOrders: 1420,
      returnRatePercent: 31.4,
      topReasons: [
        { reason: "Too Tight at Shoulders & Chest", percentage: 48 },
        { reason: "Waist smaller than expected after wash", percentage: 29 },
        { reason: "Sleeve stiff / unable to move arms", percentage: 15 },
        { reason: "Defective item", percentage: 8 }
      ]
    },
    sampleImages: {
      front: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
      flatLay: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    skuId: "SKU-ATH-002",
    title: "Pro-Performance High-Elasticity Compression Ribbed Tee",
    brand: "VeloMotion Sport",
    category: "Tops",
    gender: "Unisex",
    techPackSource: "VeloMotion_Performance_Spec_2026.docx",
    fabric: {
      gsm: 190,
      fabricType: "Polyester Elastane Blend",
      stretchPercent: 32,
      shrinkagePercent: 0.5,
      composition: "88% Recycled Poly, 12% Spandex"
    },
    declaredSizeTable: {
      S: { chestCm: 88, shoulderCm: 39, waistCm: 78, hipsCm: 86, lengthCm: 63, sleeveCm: 20, stretchToleranceCm: 12 },
      M: { chestCm: 94, shoulderCm: 41, waistCm: 84, hipsCm: 92, lengthCm: 66, sleeveCm: 21, stretchToleranceCm: 14 },
      L: { chestCm: 100, shoulderCm: 43, waistCm: 90, hipsCm: 98, lengthCm: 69, sleeveCm: 22, stretchToleranceCm: 16 },
      XL: { chestCm: 108, shoulderCm: 45.5, waistCm: 98, hipsCm: 106, lengthCm: 72, sleeveCm: 23, stretchToleranceCm: 18 }
    },
    historicalReturns: {
      totalOrders: 3100,
      returnRatePercent: 12.2,
      topReasons: [
        { reason: "Too Snug / Showed Body Outline", percentage: 52 },
        { reason: "Rides up at waist during running", percentage: 28 },
        { reason: "Color slightly off", percentage: 20 }
      ]
    },
    sampleImages: {
      front: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      flatLay: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    skuId: "SKU-ETHNIC-003",
    title: "Handloom Cotton Festive Kurta with Mandarin Collar",
    brand: "Sanskriti Handlooms (IN)",
    category: "Ethnic Wear",
    gender: "Men",
    techPackSource: "Sanskriti_IN_Kurta_SpecSheet.png",
    fabric: {
      gsm: 160,
      fabricType: "100% Khadi Handloom Cotton",
      stretchPercent: 2,
      shrinkagePercent: 4.0,
      composition: "100% Pure Organic Cotton"
    },
    declaredSizeTable: {
      S: { chestCm: 100, shoulderCm: 43, waistCm: 96, hipsCm: 102, lengthCm: 98, sleeveCm: 61, stretchToleranceCm: 1 },
      M: { chestCm: 106, shoulderCm: 45, waistCm: 102, hipsCm: 108, lengthCm: 101, sleeveCm: 63, stretchToleranceCm: 1 },
      L: { chestCm: 112, shoulderCm: 47, waistCm: 108, hipsCm: 114, lengthCm: 104, sleeveCm: 64.5, stretchToleranceCm: 1 },
      XL: { chestCm: 120, shoulderCm: 49.5, waistCm: 116, hipsCm: 122, lengthCm: 107, sleeveCm: 66, stretchToleranceCm: 1 }
    },
    historicalReturns: {
      totalOrders: 1890,
      returnRatePercent: 26.8,
      topReasons: [
        { reason: "Chest tight at armhole seam", percentage: 41 },
        { reason: "Shrank significantly after first wash", percentage: 38 },
        { reason: "Length too long for average Indian height", percentage: 21 }
      ]
    },
    sampleImages: {
      front: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      flatLay: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    skuId: "SKU-DRESS-004",
    title: "A-Line Floral Wrap Midi Dress with Elasticated Waist",
    brand: "Flora & Vine",
    category: "Dresses",
    gender: "Women",
    techPackSource: "Flora_MidiDress_TechPack_2026.pdf",
    fabric: {
      gsm: 135,
      fabricType: "Viscose Rayon Chiffon",
      stretchPercent: 8,
      shrinkagePercent: 2.0,
      composition: "95% Viscose, 5% Spandex lining"
    },
    declaredSizeTable: {
      S: { chestCm: 86, shoulderCm: 37, waistCm: 68, hipsCm: 94, lengthCm: 112, sleeveCm: 42, stretchToleranceCm: 5 },
      M: { chestCm: 92, shoulderCm: 38.5, waistCm: 74, hipsCm: 100, lengthCm: 114, sleeveCm: 43, stretchToleranceCm: 5 },
      L: { chestCm: 98, shoulderCm: 40, waistCm: 80, hipsCm: 106, lengthCm: 116, sleeveCm: 44, stretchToleranceCm: 5 },
      XL: { chestCm: 106, shoulderCm: 42, waistCm: 88, hipsCm: 114, lengthCm: 118, sleeveCm: 45, stretchToleranceCm: 5 }
    },
    historicalReturns: {
      totalOrders: 2450,
      returnRatePercent: 19.5,
      topReasons: [
        { reason: "Bust gaped open / gap in wrap front", percentage: 46 },
        { reason: "Waist band elastic too tight", percentage: 32 },
        { reason: "Length hit mid-calf instead of knee", percentage: 22 }
      ]
    },
    sampleImages: {
      front: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      flatLay: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    }
  }
];

export const MOCK_DATASETS: DatasetSample[] = [
  {
    id: "ds-modcloth",
    name: "ModCloth Fit Feedback Dataset",
    source: "ModCloth",
    recordCount: "82,790 transactions",
    description: "Contains anonymized user body measurements (bust, waist, hips, shoe size, bra size), item dimensions, user fit rating ('small', 'fit', 'large'), and review text.",
    keyFeatures: ["Bust/Waist/Hips numericals", "Categorical fit labels", "Height/Weight prior distribution", "Shoe & Bra size mapping"],
    sampleRecord: {
      user_id: "801432",
      item_id: "152577",
      size: "M",
      fit: "small",
      user_height: "5ft 6in",
      user_weight: "135 lbs",
      bust: "34D",
      review_summary: "Beautiful dress but extremely tight across the shoulder seams."
    }
  },
  {
    id: "ds-rtr",
    name: "RentTheRunway Fit & Body Metrics Dataset",
    source: "RentTheRunway",
    recordCount: "192,544 clothing rentals",
    description: "Focuses on high-end designer apparel, customer body height, weight, body type (hourglass, athletic, pear, petite, straight), rental fit rating, and age.",
    keyFeatures: ["Body shape taxonomy", "Rental fit confidence score", "Designer size variance tables", "Category-wise return logs"],
    sampleRecord: {
      user_id: "420911",
      item_id: "126335",
      rating: "10",
      fit: "fit",
      rented_for: "wedding",
      body_type: "hourglass",
      category: "gown",
      height: "5' 8\"",
      weight: "140lbs"
    }
  },
  {
    id: "ds-df2",
    name: "DeepFashion2 Landmarks & Keypoints",
    source: "DeepFashion2",
    recordCount: "491,895 commercial garment images",
    description: "Multi-view garment bounding boxes, detailed 2D/3D facial & garment landmarks (shoulder point, armhole, sleeve hem, neckline, hemline), and bounding polygon masks.",
    keyFeatures: ["294 keypoint annotations", "Garment bounding boxes", "Style attributes (sleeve length, neckline type)", "Flat-lay vs On-Model pairs"],
    sampleRecord: {
      image_id: "002491.jpg",
      category: "short_sleeve_outwear",
      landmarks: [
        { name: "left_shoulder", x: 142, y: 88, confidence: 0.98 },
        { name: "right_shoulder", x: 298, y: 91, confidence: 0.97 },
        { name: "left_chest", x: 130, y: 180, confidence: 0.95 },
        { name: "right_chest", x: 310, y: 182, confidence: 0.96 }
      ]
    }
  },
  {
    id: "ds-cloth3d",
    name: "Cloth3D Fabric Drape & Stretch Simulator",
    source: "Cloth3D",
    recordCount: "16,500 3D garment-body meshes",
    description: "Provides realistic 3D synthetic cloth dynamics simulation over dynamic human bodies. Contains cloth stiffness, density, stretch elasticity %, and friction coefficient parameters.",
    keyFeatures: ["GSM weight impact", "Poisson ratio elasticity", "Non-linear stretch curves", "3D garment strain maps"],
    sampleRecord: {
      mesh_id: "c3d_denim_091",
      material_type: "Rigid Denim 12oz",
      young_modulus: "4.2 e8 Pa",
      stretch_limit: "0.02 (2%)",
      drape_coefficient: "0.78"
    }
  },
  {
    id: "ds-viton",
    name: "VITON-HD High-Res Virtual Try-On",
    source: "VITON-HD",
    recordCount: "13,679 high-resolution image pairs (1024x768)",
    description: "Pairs of clothing images and human model photos used to train neural warping models for cloth-to-body alignment and geometric fit preservation.",
    keyFeatures: ["Thin Plate Spline (TPS) warping", "DensePose body keypoint coordinates", "Agostic body masks", "High resolution texture mapping"],
    sampleRecord: {
      pair_id: "00102_00.jpg",
      cloth_type: "upper_body",
      densepose_uv: "dp_00102_00.png",
      body_height_px: 680
    }
  },
  {
    id: "ds-indian",
    name: "Indian Apparel Brand Standard Size Matrix",
    source: "Indian Sizing Consortium",
    recordCount: "42 Indian Retail Brands",
    description: "Standardized torso & height distribution matrices tailored for Indian regional demographics (e.g., INDIA SIZE project specs by NIFT), accommodating wider hip-to-waist ratios and shorter sleeve lengths.",
    keyFeatures: ["NIFT India Size Standard", "Kurtas & Sherwani sizing", "Saree blouse armhole specs", "Regional body variance offsets"],
    sampleRecord: {
      standard_code: "IN-MEN-M-40",
      chest_cm: "101.6 (40 in)",
      shoulder_cm: "45.7 (18 in)",
      kurta_length_cm: "101.6",
      armhole_circumference_cm: "48.2"
    }
  }
];
