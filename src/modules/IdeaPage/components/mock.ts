import type { Idea } from "@/database/entities";

export const mockdata: Idea[] = [
	{
		id: 1,
		createdAt: new Date("2025-04-15T14:00:00Z"),
		updatedAt: new Date("2025-06-06T08:00:00Z"),
		deletedAt: undefined,
		title: "Nền tảng học tập tương tác",
		description:
			"Một nền tảng học tập sử dụng game hóa để dạy lập trình với các thử thách tương tác và phản hồi thời gian thực.",
		duration: 4,
		status: "Draft",
		keyFeatures: [
			"Thử thách tương tác",
			"Phản hồi tức thì",
			"Hệ thống điểm thưởng",
		],
		potential: "High",
		tags: ["Giáo dục", "Lập trình", "Game hóa"],
		relatedIdeas: ["AI Study Buddy", "VR Classroom"],
	},
	{
		id: 2,
		createdAt: new Date("2025-04-15T14:00:00Z"),
		updatedAt: new Date("2025-06-06T08:00:00Z"),
		deletedAt: undefined,
		title: "Thư viện nghệ thuật VR",
		description:
			"Trải nghiệm thực tế ảo trưng bày tác phẩm nghệ thuật từ các nghệ sĩ toàn cầu, kèm bình luận tương tác.",
		duration: 6,
		status: "Executing",
		keyFeatures: ["Trưng bày 3D", "Bình luận tương tác", "Tương thích Oculus"],
		potential: "Medium",
		tags: ["VR", "Nghệ thuật", "Tương tác"],
		relatedIdeas: ["AR Museum", "Digital Art Marketplace"],
	},
	{
		id: 3,
		createdAt: new Date("2025-04-15T14:00:00Z"),
		updatedAt: new Date("2025-06-06T08:00:00Z"),
		deletedAt: undefined,
		title: "Trợ lý học tập AI",
		description:
			"Ứng dụng di động dùng AI để tạo kế hoạch học tập cá nhân hóa và theo dõi tiến độ.",
		duration: 8,
		status: "Archived",
		keyFeatures: [
			"Kế hoạch học tập cá nhân",
			"Theo dõi tiến độ",
			"AI phân tích",
		],
		potential: "Low",
		tags: ["AI", "Giáo dục", "Di động"],
		relatedIdeas: ["Smart Tutor", "Learning Analytics"],
	},
	{
		id: 4,
		createdAt: new Date("2025-04-15T14:00:00Z"),
		updatedAt: new Date("2025-06-06T08:00:00Z"),
		deletedAt: undefined,
		title: "Trợ lý học tập AI",
		description:
			"Ứng dụng di động dùng AI để tạo kế hoạch học tập cá nhân hóa và theo dõi tiến độ.",
		duration: 8,
		status: "Executing",
		keyFeatures: [
			"Kế hoạch học tập cá nhân",
			"Theo dõi tiến độ",
			"AI phân tích",
		],
		potential: "High",
		tags: ["AI", "Giáo dục", "Di động"],
		relatedIdeas: ["Smart Tutor", "Learning Analytics"],
	},
	{
		id: 5,
		createdAt: new Date("2025-04-15T14:00:00Z"),
		updatedAt: new Date("2025-06-06T08:00:00Z"),
		deletedAt: undefined,
		title: "Trợ lý học tập AI",
		description:
			"Ứng dụng di động dùng AI để tạo kế hoạch học tập cá nhân hóa và theo dõi tiến độ.",
		duration: 8,
		status: "Aborted",
		keyFeatures: [
			"Kế hoạch học tập cá nhân",
			"Theo dõi tiến độ",
			"AI phân tích",
		],
		potential: "Medium",
		tags: ["AI", "Giáo dục", "Di động"],
		relatedIdeas: ["Smart Tutor", "Learning Analytics"],
	},
	{
		id: 6,
		createdAt: new Date("2025-04-15T14:00:00Z"),
		updatedAt: new Date("2025-06-06T08:00:00Z"),
		deletedAt: undefined,
		title: "Trợ lý học tập AI",
		description:
			"Ứng dụng di động dùng AI để tạo kế hoạch học tập cá nhân hóa và theo dõi tiến độ.",
		duration: 8,
		status: "Archived",
		keyFeatures: [
			"Kế hoạch học tập cá nhân",
			"Theo dõi tiến độ",
			"AI phân tích",
		],
		potential: "Medium",
		tags: ["AI", "Giáo dục", "Di động"],
		relatedIdeas: ["Smart Tutor", "Learning Analytics"],
	},
];
