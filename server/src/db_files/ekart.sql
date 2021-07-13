-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 12, 2021 at 08:25 PM
-- Server version: 5.7.23-23
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qjzcohmy_ekart`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_contents`
--

CREATE TABLE `cart_contents` (
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `coupon_code` varchar(62) DEFAULT NULL,
  `net_price` decimal(8,2) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `coupon_id` int(11) DEFAULT NULL,
  `price_before_coupon` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_contents`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(62) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `tot_coupons_used` int(11) DEFAULT NULL,
  `coupon_quantity` int(11) NOT NULL,
  `coupon_code` varchar(30) NOT NULL COMMENT 'we not using this clm',
  `institute_id` int(11) DEFAULT NULL,
  `on_course_id` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `label` varchar(13) NOT NULL,
  `discount_percent` int(11) DEFAULT NULL,
  `valid_from` date NOT NULL,
  `valid_till` date NOT NULL,
  `terms_and_conditions` varchar(10000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupons`
--


-- --------------------------------------------------------

--
-- Table structure for table `institute_details`
--

CREATE TABLE `institute_details` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `address` text COLLATE utf8_unicode_ci,
  `zip_code` int(6) DEFAULT NULL,
  `ph_number` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mob_number` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alt_email` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `no_of_branches` int(11) DEFAULT NULL,
  `no_of_students` int(11) DEFAULT NULL,
  `courses_details` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `allowed_city` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `institute_city_other` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `institute_image` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number_of_records` int(11) DEFAULT NULL,
  `institute_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `website_home_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `buy_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `facility_description` text COLLATE utf8_unicode_ci,
  `facility_pdf` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facility_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `placement_description` text COLLATE utf8_unicode_ci,
  `placement_pdf` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `placement_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `activity_description` text COLLATE utf8_unicode_ci,
  `activity_pdf` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `activity_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `admission_description` text COLLATE utf8_unicode_ci,
  `admission_pdf` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `admission_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `industry_description` text COLLATE utf8_unicode_ci,
  `industry_pdf` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `industry_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `faculty_description` text COLLATE utf8_unicode_ci,
  `faculty_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `faculty_pdf` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `industry_tieup_description` text COLLATE utf8_unicode_ci,
  `industry_tieup_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `industry_tieup_pdf` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title1` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf1` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title2` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf2` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title3` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf3` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title4` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf4` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title5` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf5` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf6` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title6` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf7` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title7` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf8` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title8` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf9` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title9` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf10` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdf_title10` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `disp_profile_flag` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apply_filter_test` char(9) COLLATE utf8_unicode_ci DEFAULT NULL,
  `multi_attempt` char(9) COLLATE utf8_unicode_ci DEFAULT NULL,
  `monthly_sms_limit` int(11) DEFAULT NULL,
  `enable_exam_menu` text COLLATE utf8_unicode_ci,
  `enable_tab_menu` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `app_text` text COLLATE utf8_unicode_ci,
  `app_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `flag_faq` tinyint(4) DEFAULT NULL,
  `flag_article` tinyint(4) DEFAULT NULL,
  `flag_notification` tinyint(4) DEFAULT NULL,
  `flag_foreign_edu` tinyint(4) DEFAULT NULL,
  `flag_knowledge_zone` tinyint(4) DEFAULT NULL,
  `flag_ebook` tinyint(4) DEFAULT NULL,
  `flag_more_exams` tinyint(4) DEFAULT NULL,
  `flag_footer` tinyint(4) DEFAULT NULL,
  `flag_video` tinyint(4) DEFAULT NULL,
  `flag_schol_test` tinyint(4) DEFAULT NULL,
  `flag_ad` tinyint(4) DEFAULT NULL,
  `flag_wiki` tinyint(4) DEFAULT NULL,
  `flag_ask_question` tinyint(4) DEFAULT NULL,
  `flag_career_counselling` tinyint(4) DEFAULT NULL,
  `flag_web_management` tinyint(4) DEFAULT NULL,
  `flag_app_management` tinyint(4) DEFAULT NULL,
  `flag_test_management` tinyint(4) DEFAULT NULL,
  `flag_gmail_login` tinyint(4) DEFAULT NULL,
  `flag_college_name` tinyint(4) DEFAULT NULL,
  `flag_school_name` tinyint(4) DEFAULT NULL,
  `flag_dynamic_blocks` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `flag_inst_type` tinyint(4) DEFAULT NULL,
  `flag_web_pkg` tinyint(4) DEFAULT NULL,
  `user_package_count` int(5) DEFAULT NULL,
  `deactivate_test_count` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `institute_hash` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `inst_subdomain` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_test_expiry` date DEFAULT NULL,
  `date_app_expiry` date DEFAULT NULL,
  `business_type` char(9) COLLATE utf8_unicode_ci DEFAULT NULL,
  `inst_redirect_url` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `inst_redirect_host` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `flag_inst_video` tinyint(4) DEFAULT NULL,
  `flag_lead` tinyint(4) DEFAULT NULL,
  `inst_basic_detail` text COLLATE utf8_unicode_ci,
  `institute_courses` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `inst_web_profiler` tinyint(4) DEFAULT NULL,
  `flag_pay_online` tinyint(4) DEFAULT NULL,
  `flag_institute_management` tinyint(4) DEFAULT NULL,
  `ols_expired` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `app_expired` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `web_expired` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ols_expired_date` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `app_expired_date` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `web_expired_date` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `flag_landing_page` tinyint(4) DEFAULT NULL,
  `institute_plan` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `add_date` date DEFAULT NULL,
  `flag_version` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `enable_ebook_ids` varchar(765) COLLATE utf8_unicode_ci DEFAULT NULL,
  `speedlabs_status` int(2) DEFAULT NULL,
  `speedlabs_link` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ekart_status` int(2) DEFAULT NULL,
  `liveclass_status` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `institute_details`
--


-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(256) DEFAULT NULL,
  `invoice_number` varchar(100) DEFAULT NULL,
  `receipt` varchar(200) DEFAULT NULL,
  `currency` varchar(5) DEFAULT NULL,
  `payment_id` varchar(200) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `published_by` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `order_status` varchar(30) NOT NULL,
  `method_of_payment` varchar(30) NOT NULL,
  `from_bank_ac` varchar(100) DEFAULT NULL,
  `to_bank_ac` varchar(100) DEFAULT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  `price_before_coupon` decimal(8,2) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `issued_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--


-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `issued_by` int(11) DEFAULT NULL,
  `image_name` varchar(100) NOT NULL,
  `image_url` varchar(1000) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `creator_name` varchar(62) NOT NULL,
  `category` int(11) NOT NULL,
  `sub_category` int(11) DEFAULT NULL,
  `label` varchar(32) DEFAULT NULL,
  `status` varchar(32) NOT NULL,
  `tot_students` int(11) NOT NULL,
  `short_description` text,
  `description` text NOT NULL,
  `you_will_learn` text,
  `this_includes` text,
  `pre_requisites` text,
  `set_currency` varchar(1) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT '0',
  `course_rating` decimal(6,5) NOT NULL,
  `tot_ratings` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_type` varchar(62) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--


-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `content_id` int(11) NOT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `title` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `resource_type` varchar(32) NOT NULL,
  `is_paid` tinyint(4) NOT NULL,
  `section_name` varchar(100) NOT NULL,
  `image_url` varchar(100) DEFAULT NULL,
  `resource_name` varchar(100) NOT NULL,
  `resource_url` varchar(1000) NOT NULL,
  `rating` decimal(7,5) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `section_order` int(11) DEFAULT NULL,
  `resource_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resources`
--


-- --------------------------------------------------------

--
-- Table structure for table `user_carts`
--

CREATE TABLE `user_carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amt` decimal(8,2) NOT NULL,
  `last_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_carts`
--


-- --------------------------------------------------------

--
-- Table structure for table `user_detail`
--

CREATE TABLE `user_detail` (
  `user_id` int(11) NOT NULL,
  `user_hash` varchar(255) DEFAULT NULL,
  `is_admin` int(11) DEFAULT NULL,
  `parent_user_id` int(11) NOT NULL,
  `user_inst_id` int(11) DEFAULT NULL,
  `user_school_id` int(11) DEFAULT NULL,
  `user_college_id` int(11) DEFAULT NULL,
  `dealer_id` int(11) DEFAULT NULL,
  `public_secure_code` varchar(255) DEFAULT NULL,
  `user_count` int(11) DEFAULT NULL,
  `test_control_status` enum('yes','no') DEFAULT NULL,
  `package_description` text,
  `last_active` datetime DEFAULT NULL,
  `app_rating_count` int(11) NOT NULL DEFAULT '0',
  `user_email` varchar(255) DEFAULT NULL,
  `user_email_status` tinyint(1) NOT NULL DEFAULT '0',
  `user_password` varchar(255) DEFAULT NULL,
  `user_fb_email` varchar(255) DEFAULT NULL,
  `user_fb_id` varchar(255) DEFAULT NULL,
  `user_gplus_email` varchar(255) DEFAULT NULL,
  `user_gplus_id` varchar(255) DEFAULT NULL,
  `user_first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `country_code` varchar(100) DEFAULT NULL,
  `user_contact_no` varchar(15) DEFAULT NULL,
  `user_country_id` int(255) DEFAULT NULL,
  `user_state_id` int(11) DEFAULT NULL,
  `user_city_id` int(11) DEFAULT NULL,
  `user_city_name` varchar(255) DEFAULT NULL,
  `user_state_name` varchar(255) DEFAULT NULL,
  `user_country_name` varchar(255) DEFAULT NULL,
  `user_city_other` varchar(255) DEFAULT NULL,
  `user_address` text,
  `zip_code` int(11) NOT NULL,
  `user_credit` int(11) DEFAULT NULL,
  `user_gender` varchar(25) DEFAULT NULL,
  `user_dob` date DEFAULT NULL,
  `user_status` tinyint(4) DEFAULT NULL,
  `user_photo` varchar(255) DEFAULT NULL,
  `user_image_update` datetime DEFAULT NULL,
  `user_image_url` varchar(255) DEFAULT NULL,
  `user_created` datetime DEFAULT NULL,
  `user_updated` datetime DEFAULT NULL,
  `user_package_expire` date DEFAULT NULL,
  `user_qual_g_id` int(11) DEFAULT '0',
  `user_qual_pg_id` int(11) DEFAULT NULL,
  `user_qual` varchar(255) DEFAULT NULL,
  `prev_exam_percentage` varchar(100) DEFAULT NULL,
  `user_location` varchar(255) DEFAULT NULL,
  `user_about` text,
  `org_name` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `user_qual_year` varchar(255) DEFAULT NULL,
  `group_no` varchar(25) DEFAULT NULL,
  `stream` varchar(255) DEFAULT NULL,
  `user_college_name` varchar(255) DEFAULT NULL,
  `user_school_name` varchar(255) DEFAULT NULL,
  `year_of_passing` varchar(255) DEFAULT NULL,
  `gre_test_enable` tinyint(4) DEFAULT NULL,
  `select_gre_test` varchar(255) DEFAULT NULL,
  `delete_flag` tinyint(2) DEFAULT NULL,
  `collaboration_status` enum('active','inactive','ignore') NOT NULL DEFAULT 'inactive',
  `import_type` varchar(100) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `register_gcm_id` text,
  `enable_app_test` tinyint(4) DEFAULT NULL,
  `enable_app_test_pin` varchar(255) DEFAULT NULL,
  `enable_learno_exam_ids` varchar(255) NOT NULL DEFAULT '0',
  `settle_amount` int(11) DEFAULT NULL,
  `paid_amount` double DEFAULT NULL,
  `ebook_paid_amount` double DEFAULT NULL,
  `purchase_product_date` datetime DEFAULT NULL,
  `mob_paid_amount` double DEFAULT NULL,
  `fee_amount` double DEFAULT NULL,
  `flag_web_access` tinyint(4) NOT NULL DEFAULT '0',
  `flag_purchase_ebook` varchar(255) DEFAULT NULL,
  `purchase_ebook_date` datetime DEFAULT NULL,
  `flag_purchase_video` varchar(255) DEFAULT NULL,
  `purchase_video_date` datetime DEFAULT NULL,
  `app_version` varchar(255) DEFAULT NULL,
  `app_id` varchar(255) DEFAULT NULL,
  `access_allow` enum('Yes','No') DEFAULT NULL COMMENT 'No - MOBILE ACCESS NOT ALLOW, Yes - MOBILE ACCESS ALLOW',
  `enable_inst_tab` varchar(255) DEFAULT NULL,
  `enable_video_category` varchar(255) NOT NULL DEFAULT '0',
  `enable_notes_category` varchar(255) NOT NULL DEFAULT '0',
  `deleted_inst_id` int(11) DEFAULT NULL,
  `deleted_email` varchar(255) DEFAULT NULL,
  `assign_ebook_ids` varchar(255) NOT NULL DEFAULT '0',
  `group_id` int(250) NOT NULL COMMENT 'Comes from group management tbl',
  `enable_short_test` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_detail`
--


--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_contents`
--
ALTER TABLE `cart_contents`
  ADD PRIMARY KEY (`cart_id`,`product_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `coupon_id` (`coupon_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `institute_id` (`institute_id`),
  ADD KEY `on_course_id` (`on_course_id`);

--
-- Indexes for table `institute_details`
--
ALTER TABLE `institute_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`issued_by`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`user_id`,`content_id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `user_carts`
--
ALTER TABLE `user_carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `public_secure_code` (`public_secure_code`),
  ADD KEY `user_inst_id` (`user_inst_id`),
  ADD KEY `user_email` (`user_email`),
  ADD KEY `user_hash` (`user_hash`),
  ADD KEY `app_id` (`app_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `institute_details`
--
ALTER TABLE `institute_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `user_carts`
--
ALTER TABLE `user_carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_contents`
--
ALTER TABLE `cart_contents`
  ADD CONSTRAINT `cart_contents_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `user_carts` (`id`),
  ADD CONSTRAINT `cart_contents_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `cart_contents_ibfk_3` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`);

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `categories_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `institute_details` (`id`);

--
-- Constraints for table `coupons`
--
ALTER TABLE `coupons`
  ADD CONSTRAINT `coupons_ibfk_1` FOREIGN KEY (`institute_id`) REFERENCES `institute_details` (`id`),
  ADD CONSTRAINT `coupons_ibfk_2` FOREIGN KEY (`on_course_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`issued_by`) REFERENCES `institute_details` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category`) REFERENCES `categories` (`id`);

--
-- Constraints for table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `user_carts`
--
ALTER TABLE `user_carts`
  ADD CONSTRAINT `user_carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_detail` (`user_id`);

--
-- Constraints for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD CONSTRAINT `user_detail_ibfk_1` FOREIGN KEY (`user_inst_id`) REFERENCES `institute_details` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
