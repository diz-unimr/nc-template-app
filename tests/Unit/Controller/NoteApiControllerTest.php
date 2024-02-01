<?php

declare(strict_types=1);
// SPDX-FileCopyrightText: Sebastian Stöcker <sebastian.stoecker@uni-marburg.de>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\TemplateApp\Tests\Unit\Controller;

use OCA\TemplateApp\Controller\NoteApiController;
use OCA\TemplateApp\Service\NoteService;
use OCP\IRequest;

class NoteApiControllerTest extends NoteControllerBase {
	protected NoteApiController $controller;

	public function setUp(): void {
		$this->request = $this->getMockBuilder(IRequest::class)->getMock();
		$this->service = $this->getMockBuilder(NoteService::class)
			->disableOriginalConstructor()
			->getMock();

		$this->controller = new NoteApiController($this->request, $this->service, $this->userId);
	}
}
