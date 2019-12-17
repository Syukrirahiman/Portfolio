<?php
class Sort {
	function title($a, $b)
	{
	    return strcmp($a->title,$b->title);
	}
	function isbn13($a, $b)
	{
		return strnatcmp($a->isbn13,$b->isbn13);
	}
	function price($a, $b)
	{
		return strnatcmp($a->price,$b->price);
	}
	function availability($a, $b)
	{
		return strnatcmp($a->availability,$b->availability);
	}
	function storeid($a, $b)
	{
		return strnatcmp($a->storeid,$b->storeid);
	}
	function bootstrap($a, $b)
	{
		return strcmp(end($a),end($b));
	}
	function sort_it($list,$sorttype)
	{
		usort($list,array($this,$sorttype));
		return $list;
	}

}

?>