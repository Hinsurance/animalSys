$(function() {
	$('#submit-btn').on('click',function() {
		$('#result').html('');
		//获取当前已知的动物特征
		var cur_true = [];
		for (var i = 0;i < 24;i++) {
			var checkbox = $('.checkbox'+i);
			if (checkbox.is(':checked')) {
				cur_true.push(checkbox.val());
			}
		}
		
		//规则库
		var rule_list = [];
		rule_list[0] = ['有毛发','哺乳动物'];
		rule_list[1] = ['有奶','哺乳动物'];
		rule_list[2] = ['有羽毛','是鸟'];
		rule_list[3] = ['会飞','会下蛋','是鸟'];
		rule_list[4] = ['吃肉','肉食动物'];
		rule_list[5] = ['有犬齿','有爪','眼盯前方','肉食动物'];
		rule_list[6] = ['哺乳动物','有蹄','有蹄动物'];
		rule_list[7] = ['哺乳动物','嚼反刍动物','有蹄动物'];
		rule_list[8] = ['哺乳动物','肉食动物','黄褐色','身上有暗斑点','金钱豹'];
		rule_list[9] = ['哺乳动物','肉食动物','黄褐色','有黑色条纹','虎'];
		rule_list[10] = ['有蹄动物','有长脖子','有长腿','身上有暗斑点','长颈鹿'];
		rule_list[11] = ['有蹄动物','有黑色条纹','斑马'];
		rule_list[12] = ['是鸟','有长脖子','有长腿','不会飞','鸵鸟'];
		rule_list[13] = ['是鸟','会游泳','不会飞','有黑白两色','企鹅'];
		rule_list[14] = ['是鸟','善飞','信天翁'];

		//待测试规则表
		var wait_list = [];
		var if_first_period = true;//第一轮推理不需比较存储器内容是否不变或者测试规则表是否为空
		reasoningPeriod(cur_true,rule_list,[]);
		/**
		 * 推理周期函数
		 * @param  {[type]} cur_true  当前事实/工作存储器
		 * @param  {[type]} rule_list 规则
		 * @param  {[type]} wait_list 待测试规则表
		 * @return {[type]}           [description]
		 */
		function reasoningPeriod(cur_true,rule_list,wait_list) {
			var par_cur_true = cur_true,
				par_cur_true_length = par_cur_true.length;
			var rule_list_length = rule_list.length;
			for (var i = 0;i < rule_list_length;i++) {
				var cur_rule = rule_list[i],//当前规则
					length = cur_rule.length;//当前规则前件后件总数

				var fix_count = 0;//当前规则的前件与事实匹配的数量
				var if_confilct = false;//判断当前规则的前件是否与事实矛盾
				for (var j = 0;j < length - 1;j++) {
					for (var k = 0;k < par_cur_true_length;k++) {
						if (cur_rule[j] == cur_true[k]) {
							fix_count++;
						}
					}
				}
				if (fix_count === length-1) {
					cur_true.push(cur_rule[length - 1]);
				} else {
					wait_list.push(cur_rule);
				}
			}

			var child_cur_true_lenght = cur_true.length;
				
			if((child_cur_true_lenght == par_cur_true_length) || !wait_list.length) {
				if (cur_true[child_cur_true_lenght-1] == '金钱豹' || cur_true[child_cur_true_lenght-1] == '虎' || cur_true[child_cur_true_lenght-1] == '长颈鹿' || cur_true[child_cur_true_lenght-1] == '斑马' || cur_true[child_cur_true_lenght-1] == '鸵鸟' || cur_true[child_cur_true_lenght-1] == '企鹅' || cur_true[child_cur_true_lenght-1] == '信天翁') {
					$('#result').html(cur_true[child_cur_true_lenght-1]);
				} else {
					$('#result').html('请输入再详细点的信息');
				}
				return false;
			} else {
				reasoningPeriod(cur_true,wait_list,[]);
			}
		}
	})
})